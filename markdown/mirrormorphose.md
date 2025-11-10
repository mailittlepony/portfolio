# MirrorMorphose
---
![img](./images/mirrormorphose/mirror.png)

## Abstract
**MirrorMorphose** is an interactive mirror that uses **gaze** as an emotional portal between **space** and **time**. When the viewer **maintains eye contact** with their reflection, the image **gradually morphs** into a childhood version of themselves, a family member, or another person, who stares back and listens carefully, **inviting a dialogue across identity and time**. Through this slow visual transformation, the project explores **how sustained gaze fosters empathy, self-recognition, and the blurring of boundaries between self and other**.
  Drawing from practices of **meditation**, **hypnosis**, and therapeutic mirroring, MirrorMorphose proposes the gaze as an active medium of **connection**, both technological and intimate. The project challenges the viewer to confront their own reflection as a lived encounter, where **memory**, **emotion**, and **technology** intertwine. In doing so, **seeing** becomes a form of **becoming**, engaging viewers in having **reflections or conversations in a meditative act of meeting oneself through the eyes of another**. 

<video src="/portfolio/images/mirrormorphose/demo.mp4" autoplay loop muted playsinline preload="metadata"></video>


## Technical Aspect
---

![img](./images/mirrormorphose/ext.png)

> The MirrorMorphose device consists of a 3D-printed frame, sanded and painted to create an enchanting, magical
appearance. A one-way mirror with an OLED screen is mounted inside to achieve a seamless reflective surface. Behind the screen, the electronics include a camera and an Orange Pi 5 Max, which runs all the control and processing code.

![img](./images/mirrormorphose/int.png)

The software architecture is organized into **three** clear modules:
- **Gaze Tracking**: detects when the user maintains eye contact with their reflection.
- **Morphing Module**: gradually transforms the user’s face into a target reflection while they continue gazing.
- **Reenactment Module**: generates an animated, “listening” reflection from a target image and prerecorded
driving video.
The pipeline begins with **two inputs**: a **target image** (past self, family member, friend, or stranger) and a **captured image** of the user. They are both sent to our server and **reenacted** to prerecorded facial motion video to generate a listening animation of both the images. The prerecorded video is **split** into frames, and each frame is **reenacted** to **interpolated images between the user’s face and the target image** via FILM. This approach achieves a **gradual morph** while maintaining the animated, **"listening" reflection**. Finally, a gaze detection library triggers the morph and plays the generated video of the user target on loop when eye contact is detected. It also tracks the user’s face to work only with him, enhancing the intimacy of the experience.
