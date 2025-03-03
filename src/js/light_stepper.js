import "../scss/light_stepper.scss";
import "animate.css";

export default class LightStepper {
  constructor({
    pagination,
    steps,
    prev,
    next,
    stepClass = ["step"],
    paginationClass = ["step__page"],
    stepActiveClass = ["step--current"],
    paginationActiveClass = ["step__page--current"],
    allowOverscroll = false,
    isValidStep = () => true,
  }) {
    this.currentStep = 0;
    this.firstInit = true;

    // Initialize class properties
    this.stepClass = stepClass;
    this.paginationClass = paginationClass;
    this.stepActiveClass = stepActiveClass;
    this.paginationActiveClass = paginationActiveClass;
    this.allowOverscroll = allowOverscroll;
    this.isValidStep = isValidStep;

    // Get pagination and steps elements
    this.pagination = document.querySelector(pagination)?.children || [];
    this.steps = document.querySelector(steps)?.children || [];

    // Get prev and next buttons
    this.prevButton = document.querySelector(prev);
    this.nextButton = document.querySelector(next);

    this.init();
  }

  init = () => {
    this.showStep();
    this.firstInit = false;

    this.prevButton?.addEventListener("click", this.prevStep);
    this.nextButton?.addEventListener("click", this.nextStep);
  };

  prevStep = () => {
    const newStep =
      this.currentStep < 1
        ? this.allowOverscroll
          ? this.steps.length - 1
          : 0
        : this.currentStep - 1;
    if (this.isValidStep(newStep)) {
      this.currentStep = newStep;
      this.showStep();
    }
  };

  nextStep = () => {
    const newStep =
      this.currentStep >= this.steps.length - 1
        ? this.allowOverscroll
          ? 0
          : this.steps.length - 1
        : this.currentStep + 1;
    if (this.isValidStep(newStep)) {
      this.currentStep = newStep;
      this.showStep();
    }
  };

  stepperActions = (nodeList, isPagination) => {
    Array.from(nodeList).forEach((item, index) => {
      const stepIndex = index + 1;
      item.setAttribute("step", stepIndex);

      if (!isPagination) {
        // Add step classes and manage active class
        item.classList.add(...this.stepClass);
        if (this.currentStep === index) {
          item.classList.add(...this.stepActiveClass);
        } else {
          item.classList.remove(...this.stepActiveClass);
        }
      } else {
        // Add pagination classes and manage active class
        item.classList.add(...this.paginationClass);
        if (this.currentStep === index) {
          item.classList.add(...this.paginationActiveClass);
        } else {
          item.classList.remove(...this.paginationActiveClass);
        }

        // Add click event listener for pagination items
        if (this.firstInit) {
          item.addEventListener("click", (e) => {
            const selectedStep = parseInt(e.target.getAttribute("step")) - 1;
            if (this.isValidStep(selectedStep)) {
              this.currentStep = selectedStep;
              this.showStep();
            }
          });
        }
      }
    });
  };

  showStep = () => {
    this.stepperActions(this.steps, false);
    this.stepperActions(this.pagination, true);
  };
}
