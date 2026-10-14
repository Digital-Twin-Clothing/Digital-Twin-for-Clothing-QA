# Digital Twins

**Digital Twins** is an interactive 3D virtual fitting room for the web. Users create a personalized 3D avatar from four photos (front, back, side and T-pose side), then try on digital garments in a 360° viewer. The app checks how each garment fits their body and recommends a size before they buy.

The goal is to take the guesswork out of online clothes shopping. Instead of relying on generic size charts, shoppers see clothes on a body that matches their real proportions and get a fit assessment for each region (chest, waist, hips and so on).

## Features

- **Avatar from 4 photos.** Guided photo capture with pose checks on the device, so bad photos are caught before upload.
- **3D body reconstruction.** A parametric SMPL-X body model is fitted to the photos and scaled to the user's real height, producing an avatar and body measurements.
- **Virtual try-on.** Rigged 3D garments are bound to the avatar's skeleton and shown in an interactive 360° viewer.
- **Fit assessment and size prediction.** Avatar measurements are compared against each garment's size chart to show where it's tight, good or loose, plus a recommended size.
- **Privacy first.** Photos are stored privately and users can delete their photos and avatar at any time.

## How it works

1. **Capture.** The user takes or uploads four photos. MediaPipe checks the pose and framing in the browser.
2. **Detect.** Pose landmarks and a body mask are extracted from each photo.
3. **Reconstruct.** A GPU job fits an SMPL-X body to all four views and exports the avatar (GLB) and its measurements.
4. **Try on.** Garments created and rigged in Blender are loaded onto the avatar using Linear Blend Skinning, with collision correction.
5. **Fit.** The app compares body measurements against garment size charts and recommends the best size.

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, React Three Fiber / Three.js |
| Backend | Python, FastAPI |
| Infrastructure | Modal (GPU inference), Supabase (auth, database, file storage) |
| Computer vision & ML | OpenCV, MediaPipe (pose detection, background segmentation), SMPL-X, PyTorch |
| 3D garment pipeline | Blender, GLB/glTF, Linear Blend Skinning, collision correction |
