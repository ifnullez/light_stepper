import "../scss/light_stepper.scss";

export default class LightStepper {
    
    constructor({
        pagination, 
        steps, 
        prev, 
        next
    }){
        this.step = 0;
        // set passed wrappers classes for pagination and steps and get his childrens if available 
        this.pagination = document.querySelector(pagination) ? document.querySelector(pagination).children : null;
        this.steps = document.querySelector(steps) ? document.querySelector(steps).children : null;
        // set prev and next buttons
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        
        // change step event
        // this.step_changed = new CustomEvent('step_changed', this.eventInformation);
        this.init();
    }

    // eventInformation = {
    //     bubbles: true,
    //     cancelable: true,
    //     composed: false,
    //     detail: {
    //         current_step: Math.abs(this.step),
    //         prev_step: Math.abs(this.step - 1) < 1 ? 1 : Math.abs(this.step - 1)
    //     }
    // }

    init = () => {
        // init steps and steps pagination
        this.setupStepsList(this.pagination, false);
        this.setupStepsList(this.steps, true);

        // show first step
        this.showStep(this.step);

        if( this.next ){
            this.next.addEventListener('click', e => {

                if( this.step < ( this.steps.length - 1 ) ){
                    this.step += 1;
                }

                this.showStep(this.step);
            })
        }

        if( this.prev ){
            this.prev.addEventListener( 'click', e => {

                if(this.step < 1 ){
                    this.step = 0;
                } else {
                    this.step -= 1;
                }

                this.showStep(this.step);
            })
        }
    }
    // TODO: rewrite this method
    setupStepsList = (nodeList, hideNotCurrentItems, isPagination) => {
        if(nodeList){
            for ( const [index, item] of Object.keys(nodeList)){
                let item = nodeList.item(index);
                
                item.setAttribute('step', parseInt(index));
                item.classList.add('step');

                if( ( hideNotCurrentItems || isPagination ) && this.step != parseInt(index) ){
                    item.classList.add('step--hidden');
                } else {
                    item.classList.remove('step--hidden');
                }

                // if(isPagination && this.step != parseInt(index)){
                //     item.classList.remove('step--current');
                // } else {
                //     item.classList.add('step--current');
                // }

            }
        }
    }

    showStep = (step) => {
        console.log(step)
        this.setupStepsList(this.steps, true, false);
        this.setupStepsList(this.pagination, false, true);
        
    }

}

const step = new LightStepper({
    steps: ".stepper_steps",
    pagination: ".stepper_pagination",
    prev: ".stepper_prev",
    next: ".stepper_next"
});