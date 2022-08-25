# Simple stepper
- This is class created to speed up development steppers for the needed places in the site

## Used Techologies
- [Parcel](https://parceljs.org)
- All images I get from [Unsplash](https://unsplash.com)

## Example usage
```
const step = new LightStepper({
    steps: ".stepper_steps",
    pagination: ".stepper_pagination",
    prev: ".stepper_prev",
    next: ".stepper_next",
    step_class: ['step', 'animate__animated'],
    step_active_class: ['step--current', 'animate__bounceInDown']
});
```
