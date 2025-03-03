# Simple stepper

- This class are created to speed up development steppers for the needed places in the site

## Used Techologies

- [Parcel](https://parceljs.org)
- All images I get from [Unsplash](https://unsplash.com)

## Example usage

```JavaScript
const stepper = new LightStepper({
  steps: ".stepper_steps",
  pagination: ".stepper_pagination",
  prev: ".stepper_prev",
  next: ".stepper_next",
  stepClass: ["step", "animate__animated"],
  stepActiveClass: ["step--current", "animate__bounceInDown"],
  allowOverscroll: false,
  isValidStep: (step, instance) => {
    if (step >= 3) {
      return false;
    }
    return true;
  },
});
```
