# MirrorMorphose
---
![img](./images/mirrormorphose/collage.png)

## Abstract
**MirrorMorphose** is an interactive mirror that uses **gaze** as an emotional portal between **space** and **time**. When the viewer **maintains eye contact** with their reflection, the image **gradually morphs** into a childhood version of themselves, a family member, or another person, who stares back and listens carefully, **inviting a dialogue across identity and time**. Through this slow visual transformation, the project explores **how sustained gaze fosters empathy, self-recognition, and the blurring of boundaries between self and other**.
  Drawing from practices of **meditation**, **hypnosis**, and therapeutic mirroring, MirrorMorphose proposes the gaze as an active medium of **connection**, both technological and intimate. The project challenges the viewer to confront their own reflection as a lived encounter, where **memory**, **emotion**, and **technology** intertwine. In doing so, **seeing** becomes a form of **becoming**, engaging viewers in having **reflections or conversations in a meditative act of meeting oneself through the eyes of another**. 

![demo](./images/mirrormorphose/demo.mp4)


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

### This method has now been replaced to fix the jitters seen here and "big eyes" on some frames (You can find it at the bottom of this page) !

## Process
---

My first **Proof Of Concept** was really bad: 
- **no morph**
- haarcascade based gaze tracking (so not so accurate)
- static mirror

![img](./images/mirrormorphose/v1.gif)

But then a friend and I got the opportunity to do an internship at **Henkaku Center for Radical Transformation** at the **Chiba Institute of Technology** Directed by Joichi Ito. Where they wanted us to exhibit this project at their **Symposium on Design and Science** in Tokyo so we really wanted and had to make a more presentable version in only **2 weeks**!

So with a friend we first decided to split the tasks and after a few researches use these tools: 

![img](./images/mirrormorphose/techniques.png)

We did some sketches:

![img](./images/mirrormorphose/sketch_v2.png)

and the electronics, for this version we used a **raspberry zero 2W** which was a reaaly bad choice due to so many optimizations we had to do that made us loose some precious time :( !!!
However we managed to finish it on time for the **Symposium** having slept only 2 hours!

![img](./images/mirrormorphose/v2.png)

But being rushed and suffering from our bad choice of hardware or result wasn't satisfying enough for us so we made a **third iteration** with this time the super powerful **Orange Pi 5 max**! Here are the differences between both:

![img](./images/mirrormorphose/v1vsv2.png)

Then again some sketches, experimenting all sorts of space occupation and how I wanted the flowers to be balanced or more invasive:

![img](./images/mirrormorphose/sketch_v3_1.png)
![img](./images/mirrormorphose/sketch_v3_2.png)
![img](./images/mirrormorphose/sketch_v3_3.png)

Then we printed the frame, sanded it and drew on it:

![img](./images/mirrormorphose/draw.jpeg)

and put resine on it for extra shine and a less "prototype-ish" look:

![img](./images/mirrormorphose/resin.jpeg)

Software-wise we decided to train our own **gaze-prediction** model as there was certain features that we couldn't find in others (you can find it [here](https://github.com/mailittlepony/gaze_tracker))

![demo](./images/mirrormorphose/demo_gaze.mp4)

it was a long exhaustive process as you can see:

![demo](./images/mirrormorphose/fatigue.mov)

Then I changed the morph from a very mediocre to a less mediocre one.
here's the first version:

![demo](./images/mirrormorphose/morph_video_v1.mov)

here's the second one:

![demo](./images/mirrormorphose/morph_video_v2.mov)

To finally acheive the **long "video morph"** that you can see in the final demo video at the top (explained also there). This was actually the hardest part to do because it had never been done so we had to test out so many methods, deconstruct, reconstruct, elaborate new strategies that seem all so far-fetched ! To give you an idea those are 5% of the different strategies that we tried:

- basic dissolve

- Encoder4Editing (e4e) inversion → StyleGAN2-ADA/StyleGAN3 generation → linear latent interpolation — serves as a robust baseline, though it comes with some known limitations. The most significant issue for our use case is identity drift, which persists even in the original implementation. I verified this behavior independently, and it’s consistent with their results.
I explored more recent models, but none have gained much traction, likely because diffusion models have largely replaced GAN-based approaches.
![img](./images/mirrormorphose/GAN.jpg)

Some example of dentity drift, doesn't look at all like the child image of the subject above nor his present face:

![img](./images/mirrormorphose/frame0.png)
![img](./images/mirrormorphose/frame1.png)

- reenacting the past and present images as listening and staring then split the two videos in frames and iterate through each corresponding pair of frames (past and present) and apply face-movie interpolation with a blending ratio that progresses from 0 to 1. And finally Concatenate the resulting frames into a 5 fps video and upsample from 5 fps to 30 fps using RIFE for smoother motion.
![img](./images/mirrormorphose/custom.jpg)

Result !
![img](./images/mirrormorphose/maili_morph_final.mp4)
### And this is actually the final morph we decided to keep !

But at least we now have the beautiful morph video and meaningful experience !
