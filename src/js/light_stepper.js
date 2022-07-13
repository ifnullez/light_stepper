import "../scss/light_stepper.scss";
import 'animate.css';

export default class LightStepper {
    
    constructor({
        pagination, 
        steps, 
        prev, 
        next,
        step_class,
        pagination_class,
        step_active_class,
        pagination_active_class,
        // hide_out_step_class
    }){
        this.step = 0;
        this.firstInit = true;
        // add start item classes
        this.step_class = ( typeof step_class !== 'undefined' && typeof step_class !== null ) ? step_class : ['step'];
        this.pagination_class = ( typeof pagination_class !== 'undefined' && typeof pagination_class !== null ) ? pagination_class : ['step__page'];
        // add active item classes
        this.step_active_class = ( typeof step_active_class !== 'undefined' && typeof step_active_class !== null ) ? step_active_class : ['step--current'];
        this.pagination_active_class = ( typeof pagination_active_class !== 'undefined' && typeof pagination_active_class !== null ) ? pagination_active_class : ['step__page--current'];

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
        if(nodeList && typeof nodeList !== 'undefined'){
            for (let i = 1; i <= nodeList.length; i++) {
                let item = nodeList.item(i - 1);

                item.setAttribute('step', i);

                if(!isPagination && typeof isPagination !== 'undefined') {

                    // add classes to the step item
                    item.classList.add(...this.step_class);

                    if(this.step == ( i - 1 ) ){
                        item.classList.add(...this.step_active_class);
                    } else {
                        item.classList.remove(...this.step_active_class);
                    }

                } else {
                    
                    if(this.step == ( i - 1 ) ){
                        item.classList.add(...this.pagination_active_class);
                    } else {
                        item.classList.remove(...this.pagination_active_class);
                    }
                    
                    // add classes to the pagnation items
                    item.classList.add(...this.pagination_class);

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

    showStep = () => {
        this.stepperActions(this.steps, false);
        this.stepperActions(this.pagination, true);
    }

}

const step = new LightStepper({
    steps: ".stepper_steps",
    pagination: ".stepper_pagination",
    prev: ".stepper_prev",
    next: ".stepper_next",
    step_class: ['step', 'animate__animated'],
    step_active_class: ['step--current', 'animate__bounceInDown']
});