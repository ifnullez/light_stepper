class LightStepper {

    constructor({
        pagination, 
        steps, 
        prev, 
        next
    }){
        this.pagination = document.querySelector(pagination) ? document.querySelector(pagination).children : null;
        this.steps = document.querySelector(steps) ? document.querySelector(steps).children : null;
        this.start_step = 1;
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        
        this.step_changed = new CustomEvent('step_changed', {
            bubbles: true,
            cancelable: true,
            composed: false,
            detail: {
                current_step: Math.abs(this.start_step),
                prev_step: Math.abs(this.start_step - 1) < 1 ? 1 : Math.abs(this.start_step - 1)
            }
        });
        this.showStep(this.start_step);
        this.init();
    }

    init = () => {
        console.log('init')
    }

    showStep = (step) => {
        console.log(this.start_step)
    }

}

const step = new LightStepper({
    steps: ".stepper_steps",
    pagination: ".stepper_pagination",
    prev: ".stepper_prev",
    next: ".stepper_next"
});
// step.showStep(2)
// console.log(step)