import "../scss/light_stepper.scss";

class LightStepper {
    
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
        this.setupStepsList(this.pagination, false);
        this.setupStepsList(this.steps, true);

        this.showStep(this.step);
        // TODO: fix steps switch
        if( this.next ){
            this.next.addEventListener('click', e => {
                if( this.step <= this.steps.length){
                    this.showStep(this.step++);
                } else {
                    this.step = this.steps.length;
                    this.showStep(this.steps.length);
                }
            })
        }
        if( this.prev ){
            this.prev.addEventListener( 'click', e => {
                if( this.step >= 1 ){
                    this.showStep(this.step--);
                } else {
                    this.step = 1;
                    this.showStep(1);
                }
            })
        }
    }
    // TODO: rewrite this method
    setupStepsList = (nodeList, hideNotCurrentItems) => {
        if(nodeList){
            for ( const [index, item] of Object.keys(nodeList)){
                nodeList.item(index).setAttribute('step', parseInt(index));
                // nodeList.item(index).classList.add('step');
                if(hideNotCurrentItems && this.step !== parseInt(index) ){
                    nodeList.item(index).classList.add('step--hidden');
                } else {
                    nodeList.item(index).classList.remove('step--hidden');
                }
            }
        }
    }

    showStep = (step) => {
        console.log(step)
        this.setupStepsList(this.steps, true);

        // console.log(this.pagination.entries())
        // for( let paginateItem of this.pagination){
        //     console.log(paginateItem)
        // }
        // document.dispatchEvent(this.step_changed);
        // document.addEventListener('step_changed', e => {
        //     console.log(e)
        // })
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