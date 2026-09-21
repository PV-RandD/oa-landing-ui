// macOS native H.264 motion render. Original artwork stays unchanged.
// swift -module-cache-path /tmp/oa-swift-cache scripts/render-hero.swift input.png output.mp4 width height
import Foundation
import AVFoundation
import CoreGraphics
import ImageIO
import CoreVideo

let args = CommandLine.arguments
 guard args.count == 5, let width = Int(args[3]), let height = Int(args[4]) else {
    fatalError("Usage: render-hero.swift input.png output.mp4 width height")
}
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
guard !FileManager.default.fileExists(atPath: output.path) else { fatalError("Output exists; use a new versioned path") }
guard let source = CGImageSourceCreateWithURL(input as CFURL, nil), let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else { fatalError("Cannot read source image") }
let fps: Int32 = 24
let frameCount = 240
let writer = try AVAssetWriter(outputURL: output, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true
let inputWriter = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width,
    AVVideoHeightKey: height,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: width > height ? 1_200_000 : 650_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: 48
    ]
])
inputWriter.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: inputWriter, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height,
    kCVPixelBufferCGImageCompatibilityKey as String: true,
    kCVPixelBufferCGBitmapContextCompatibilityKey as String: true
])
guard writer.canAdd(inputWriter) else { fatalError("Cannot add video input") }
writer.add(inputWriter)
guard writer.startWriting() else { fatalError("Cannot start writer: \(String(describing: writer.error))") }
writer.startSession(atSourceTime: .zero)
let cover = max(Double(width) / Double(image.width), Double(height) / Double(image.height))
for frame in 0..<frameCount {
    while !inputWriter.isReadyForMoreMediaData {
        if writer.status == .failed { fatalError("Writer failed: \(String(describing: writer.error))") }
        Thread.sleep(forTimeInterval: 0.002)
    }
    try autoreleasepool {
        var pixelBuffer: CVPixelBuffer?
        guard let pool = adaptor.pixelBufferPool,
              CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault, pool, &pixelBuffer) == kCVReturnSuccess,
              let buffer = pixelBuffer else { fatalError("Cannot allocate frame") }
        CVPixelBufferLockBaseAddress(buffer, [])
        defer { CVPixelBufferUnlockBaseAddress(buffer, []) }
        guard let context = CGContext(data: CVPixelBufferGetBaseAddress(buffer), width: width, height: height, bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buffer), space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue) else { fatalError("Cannot draw frame") }
        context.interpolationQuality = .high
        // Smooth periodic camera push: position and velocity agree at the loop seam.
        let phase = Double(frame) / Double(frameCount) * 2 * Double.pi
        let progress = (1 - cos(phase)) / 2
        let scale = cover * (1 + 0.045 * progress)
        let drawWidth = Double(image.width) * scale
        let drawHeight = Double(image.height) * scale
        let x = (Double(width) - drawWidth) * 0.70
        let y = (Double(height) - drawHeight) * 0.40
        context.draw(image, in: CGRect(x: x, y: y, width: drawWidth, height: drawHeight))
        guard adaptor.append(buffer, withPresentationTime: CMTime(value: Int64(frame), timescale: fps)) else { throw writer.error ?? NSError(domain: "Render", code: 1) }
    }
}
inputWriter.markAsFinished()
let completion = DispatchSemaphore(value: 0)
writer.finishWriting { completion.signal() }
completion.wait()
guard writer.status == .completed else { fatalError("Video failed: \(String(describing: writer.error))") }
print("Rendered \(output.lastPathComponent): \(width)×\(height), 10 seconds, 24 fps, H.264, silent")
