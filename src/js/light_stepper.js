import "../scss/light_stepper.scss";

export default class LightStepper {
    
    constructor({
        pagination, 
        steps, 
        prev, 
        next
    }){
        this.step = 0;
        this.firstInit = true;
        // set passed wrappers classes for pagination and steps and get his childrens if available 
        this.pagination = document.querySelector(pagination) ? document.querySelector(pagination).children : null;
        this.steps = document.querySelector(steps) ? document.querySelector(steps).children : null;
        
        // set prev and next buttons
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        
        this.init();
    }

    init = () => {
        // show first step after loading stepper, this also init the steps
        this.showStep();
        this.firstInit = false;

        if( this.next ){
            this.next.addEventListener('click', e => {

                if( this.step < ( this.steps.length - 1 ) ){
                    this.step += 1;
                }

                this.showStep();
            })
        }

        if( this.prev ){
            this.prev.addEventListener( 'click', e => {

                if(this.step < 1 ){
                    this.step = 0;
                } else {
                    this.step -= 1;
                }

                this.showStep();
            })
        }
    }
    // TODO: update this method
    stepperActions = (nodeList, isPagination, firstInit ) => {

        if(nodeList.length > 0 && typeof nodeList !== 'undefined'){
            for (let i = 1; i <= nodeList.length; i++) {
                let item = nodeList.item(i - 1);
                item.setAttribute('step', i);
                if(!isPagination && typeof isPagination !== 'undefined') {
                    item.classList.add('step');
                    if(this.step == ( i - 1 ) ){
                        item.classList.remove('step--hidden');
                    } else {
                        item.classList.add('step--hidden');
                    }
                } else {
                    if(this.step == ( i - 1 ) ){
                        item.classList.add('step__pagination--current');
                    } else {
                        item.classList.remove('step__pagination--current');
                    }

                    item.classList.add('step__pagination');

                    if(this.firstInit && typeof this.firstInit !== 'undefined'){
                        item.addEventListener('click', e => {
                            let selectedStep = e.target.getAttribute('step');
                            this.step = selectedStep - 1;
                            this.showStep()
                        })
                    }
                }

            }
        }
    }
    // maybe need to remove that and update current working logic
    showStep = () => {
        this.stepperActions(this.steps, false);
        this.stepperActions(this.pagination, true);
    }

}

const step = new LightStepper({
    steps: ".stepper_steps",
    pagination: ".stepper_pagination",
    prev: ".stepper_prev",
    next: ".stepper_next"
});