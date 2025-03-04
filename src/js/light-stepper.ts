import "../scss/light_stepper.scss";
import "animate.css";

interface LightStepperOptions {
  pagination: string;
  steps: string;
  prev: string;
  next: string;
  stepClass?: string[];
  paginationClass?: string[];
  stepActiveClass?: string[];
  paginationActiveClass?: string[];
  allowOverscroll?: boolean;
  isValidStep?: (step: number, stepper: LightStepper) => boolean;
}

export default class LightStepper {
  private currentStep: number;
  private firstInit: boolean;
  private stepClass: string[];
  private paginationClass: string[];
  private stepActiveClass: string[];
  private paginationActiveClass: string[];
  private allowOverscroll: boolean;
  private isValidStep: (step: number, stepper: LightStepper) => boolean;
  private steps: HTMLCollection;
  private pagination: HTMLCollection;
  private prevButton: HTMLElement | null;
  private nextButton: HTMLElement | null;
  private stepsCount: number;

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
  }: LightStepperOptions) {
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
    this.pagination =
      document.querySelector(pagination)?.children ||
      document.createDocumentFragment().children;
    this.steps =
      document.querySelector(steps)?.children ||
      document.createDocumentFragment().children;
    this.stepsCount = this.steps.length;

    // Get prev and next buttons
    this.prevButton = document.querySelector(prev);
    this.nextButton = document.querySelector(next);

    this.init();
  }

  private init = (): void => {
    this.showStep();
    this.firstInit = false;

    this.prevButton?.addEventListener("click", this.handlePrevStep);
    this.nextButton?.addEventListener("click", this.handleNextStep);
  };

  private managePrevStep = (): number => {
    if (this.currentStep < 1) {
      return this.allowOverscroll ? this.stepsCount - 1 : 0;
    } else {
      return this.currentStep - 1;
    }
  };

  private manageNextStep = (): number => {
    if (this.currentStep >= this.stepsCount - 1) {
      return this.allowOverscroll ? 0 : this.stepsCount - 1;
    } else {
      return this.currentStep + 1;
    }
  };

  private handlePrevStep = (): void => {
    const newStep = this.managePrevStep();
    this.showStep(newStep);
  };

  private handleNextStep = (): void => {
    const newStep = this.manageNextStep();
    this.showStep(newStep);
  };

  private stepperActions = (
    nodeList: HTMLCollection,
    isPagination: boolean,
  ): void => {
    Array.from(nodeList).forEach((item, index) => {
      const stepIndex = index + 1;
      item.setAttribute("step", stepIndex.toString());

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
            const selectedStep =
              parseInt((e.target as HTMLElement).getAttribute("step") ?? "0") -
              1;
            this.showStep(selectedStep);
          });
        }
      }
    });
  };

  public showStep = (step?: number): void => {
    if (step !== undefined && this.isValidStep(step, this)) {
      this.currentStep = step;
    }
    this.stepperActions(this.steps, false);
    this.stepperActions(this.pagination, true);
  };
}
