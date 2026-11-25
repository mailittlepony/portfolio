# Pipette
![teaser](./images/pipette/figures/teaser.png)
#

**A programmable pen that captures colors from the physical world and reproduces them as real ink.**

## Demo !
![demo](./images/pipette/pipette_demo.mp4)

## How It Works

Pipette uses a mixture of **cyan, magenta, and yellow photochromic dyes** whose color states can be controlled with light.

UV light activates the three pigments, while red, green, and blue light selectively deactivate them. By controlling the exposure duration of each wavelength, Pipette can synthesize different colors from the same ink.

Because the pigments interact and cannot be controlled completely independently, we characterized their optical response and used an empirical color synthesis model.

<div style="display: flex; gap: 20px; align-items: center; width: 100%;">
  <img src="./images/pipette/figures/system/ink_absorption_spectrum.png" width="52%" style="min-width: 0; object-fit: contain;">
  <img src="./images/pipette/figures/system/crosstalk_matrix_rgb.png" width="42%" style="min-width: 0; object-fit: contain;">
</div>

*Absorption spectra of the photochromic ink and measured cross-talk between the three color channels.*

### Color Synthesis

To determine how long the ink should be exposed to each light source, we built a **3 × 3 × 3 color look-up table (LUT)** from experimentally measured ink colors.

<div style="display: flex; gap: 20px; align-items: center; width: 100%;">
  <img src="./images/pipette/figures/system/lut_view.png" style="width: calc(50% - 10px); min-width: 0; object-fit: contain;">
  <img src="./images/pipette/figures/system/lut_palette.png" style="width: calc(50% - 10px); min-width: 0; object-fit: contain;">
</div>

*The measured LUT represented as a 3D color space and as the corresponding 27-color palette.*

For any requested color, the synthesis algorithm interpolates within this measured space and searches for the combination of red, green, and blue exposure times that produces the closest achievable color.

When a requested color falls outside Pipette's gamut, it is automatically mapped to the closest color the ink can reproduce.

![Color gamut mapping](./images/pipette/figures/system/gamut_mapping.png)


## Hardware & Materials

Pipette combines the programmable ink, optical activation system, sensing, electronics, and ink delivery mechanism inside a handheld pen.

![Exploded view](./images/pipette/figures/system/exploded_view.png)

### Programmable Ink

The ink contains three photochromic components corresponding to **cyan, magenta, and yellow**.

Unlike conventional ink mixing, Pipette does not store separate colored inks. The three components are pre-mixed inside a **single reservoir**, and their optical states are changed using light.

This allows the same physical ink to be repeatedly transformed into different colors before being deposited onto paper.

### Ink Cartridge & Nib

The cartridge needs to both transmit the light used for color synthesis and reliably deliver the ink for drawing.

We experimented with different cartridge materials before using a **2 mL glass vial** connected to a valve-actuated nib. The valve mechanism provides continuous ink flow while keeping the ink path compact.

<div style="display: flex; gap: 20px; align-items: center; justify-content: center; width: 100%;">
  <img src="./images/pipette/figures/system/ink_nib_assembly_silicone.png" style="width: calc(45% - 10px); min-width: 0; object-fit: contain;">
  <img src="./images/pipette/figures/system/ink_nib_assembly_glass.png" style="width: calc(45% - 10px); min-width: 0; object-fit: contain;">
</div>

*Early silicone cartridge prototype and the final glass cartridge.*

### Optical Activation

Four high-power LEDs at different wavelengths are positioned directly in front of the ink cartridge.

- **UV (365 nm)** activates the photochromic pigments
- **Red (660 nm)** primarily controls cyan
- **Green (520 nm)** primarily controls magenta
- **Blue (470 nm)** primarily controls yellow

A reflective enclosure around the cartridge redirects light toward the ink to improve the efficiency of the color transformation.

![Activation module](./images/pipette/figures/system/activation_main_module.png)

### Electronics

The system is built around an **ESP32-S3** and custom electronics controlling the activation LEDs, color sensor, OLED interface, rotary input, battery management, and color synthesis process.

![Back module](./images/pipette/figures/system/back_module.png)


## Color Picking & Interaction

Pipette provides three ways to choose a color:

- **Pick** — sample a color directly from a physical object using the sensor on the back of the pen.
- **Select** — manually choose a color using the rotary knob.
- **Recall** — store sampled colors and reproduce them later.

The color sensor is integrated into the center of the rear rotary knob, allowing the same part of the pen to act as both the main input and the color-picking interface.

![Interface](./images/pipette/figures/system/graphic_interface.png)

Once a color is selected, Pipette calculates the required light exposures, synthesizes the color inside the cartridge, and makes the resulting ink available for drawing.

![Interaction pipeline](./images/pipette/figures/system/pipeline.png)


## Evaluation

We evaluated Pipette in terms of **color gamut, synthesis time, reproduction accuracy, fading, and drawing capability**.

### Color Gamut

The current prototype covers approximately **13% of the sRGB color space**.

![Achievable color gamut](./images/pipette/figures/evaluation/cie1931_chomaticity.png)

### Synthesis Time

Depending on the requested color, synthesis takes approximately **25–67 seconds**.

![Color synthesis duration](./images/pipette/figures/evaluation/color_synthesis_durations.png)

### Color Accuracy

We evaluated the complete pipeline from picking a physical color to reproducing it as ink.

The final reproduced colors achieved a mean end-to-end error of **ΔE₀₀ = 4.48**.

<div style="display: flex; gap: 20px; align-items: center; width: 100%;">
  <img src="./images/pipette/figures/evaluation/accuracy_setup.png" style="width: calc(30% - 10px); min-width: 0; object-fit: contain;">
  <img src="./images/pipette/figures/evaluation/end_to_end_accuracy.png" style="width: calc(70% - 10px); min-width: 0; object-fit: contain;">
</div>

*Experimental setup and end-to-end color reproduction results.*

### Color Fading

The current ink is temporary: its photochromic pigments gradually return to their transparent state under ambient light.

Under constant indoor illumination, yellow faded after approximately **2 h 20 min**, while cyan and magenta remained visible for approximately **3 h 40 min**.

![Pigment fading](./images/pipette/figures/evaluation/fading_times.png)

Because each pigment fades at a different rate, the color can also gradually shift in hue before disappearing.


##[118;1:3u Drawing

Despite the optical and chemical requirements of the programmable ink, Pipette still functions as a physical drawing tool.

The valve-actuated nib produces continuous strokes of approximately **1.2 mm** and can be used for writing, sketching, and coloring.

![Drawing examples](./images/pipette/figures/evaluation/eval_drawings.png)


## Exploring Temporary Color

The fading behavior is a limitation when permanent marks are needed, but it also creates interesting possibilities for **temporary physical color**.

For example, Pipette can be used to create construction lines and color studies that gradually disappear while permanent parts of a drawing remain.

![Temporary drawing](./images/pipette/figures/use_cases/usecase1.png)

Pipette can also capture colors from physical objects and store them digitally. Even after the physical mark disappears, the stored color can later be synthesized again.

![Color collection](./images/pipette/figures/use_cases/usecase2.png)
