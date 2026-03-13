# Marsh Corporate Hero Video

## Required Video Assets

The Marsh Corporate landing page (`/marsh-corporate`) requires a hero background video.

### Expected Files

Place the following video files in the `public/` directory:

1. **marsh-corporate-hero.mp4** (Primary format - H.264 codec, MP4 container)
2. **marsh-corporate-hero.webm** (Fallback format - VP9 codec, WebM container)

### Video Specifications

- **Aspect Ratio**: 16:9 (1920x1080 or higher)
- **Duration**: 10-30 seconds (looping)
- **Codec**: H.264 (MP4) or VP9 (WebM)
- **Optimization**: Compressed for web delivery (target: under 5MB)
- **Audio**: None required (video will be muted)

### How to Export from Figma

1. Open the Figma design file
2. Locate the hero video layer in the design
3. Export the video asset
4. Optimize using a tool like HandBrake or FFmpeg:
   ```bash
   # Convert to MP4
   ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow -an marsh-corporate-hero.mp4
   
   # Convert to WebM
   ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -an marsh-corporate-hero.webm
   ```
5. Place both files in `/public/`

### Current Status

⚠️ **Placeholder**: The page currently shows a dark blue background as fallback. Once the video files are added, the background will display the actual video.

### Testing

After adding the video files:
1. Start the dev server: `npm run dev`
2. Navigate to: `http://localhost:5173/marsh-corporate`
3. Verify the video plays automatically and loops smoothly
4. Test responsive behavior across breakpoints

---

*Last updated: 2025-11-20*
