class Cheuduleur
{
    constructor(opts = {}){

        const defaultOptions = {
            divParentSelector: '.cheuduleur',
            days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            daysShort: [ 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'],
            months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            serviceName: 'Chambres',
            startDate : this.currentMonday(),
            endDate: new Date(this.currentMonday().getTime() + (1000 * 3600 * 24 * 6)),
            events: []
        }
    
        this.options = {...defaultOptions, ...opts}
        this.divParentElement = document.querySelector(this.options.divParentSelector)
        this.currentStartDate = this.options.startDate
        this.currentEndDate = this.options.endDate
        this.indexMapping =  [6,0,1,2,3,4,5]
    }

    draw(){
        
        let tableHeader = `<th>${this.options.serviceName}</th>`
        let tableBody = ``

        this.divParentElement.classList.add('cheuduleur-container')

        for(let i = 0; i <= this.daysNumber();++i)
        {
            tableHeader += `<th><span class="text-secondary">${this.options.daysShort[this.indexMapping[this.dayDate(i).getDay()]]}</span> <span>${this.dayDate(i).getDate()}</span></th>`
        }

        this.options.events.forEach((event)=>{
            let key = Object.keys(event)
            let tableElements = `<td>${event.name}</td>`
            
            for(let i = 0; i <= this.daysNumber();++i)
            {
                let content = ``
                if(i == 0)
                {
                    event.data.forEach((el, index)=>{
                        if(this.isInCurrentWeek(el.startDate, el.endDate))
                            content += this.renderEvent(key, el)
                    })
                    
                }else
                {
                    content = ``
                }
                tableElements += `<td>${content}</td>`
            }
            
            let tableRow = `
                <tr>
                    ${tableElements}
                </tr>
            `
            tableBody += tableRow
        })

        this.divParentElement.appendChild(this.stringToHtml(`
            <div>
                <div class="header">
                    <div class="infos">
                        ${this.options.months[this.currentStartDate.getMonth()]} ${this.currentStartDate.getFullYear()}
                    </div>
                    <div class="actions">
                        <button class="previous"><span class="material-icons-outlined">navigate_before<span></button>
                        <button class="next"><span class="material-icons-outlined">navigate_next<span></button>
                    </div>
                </div>
                
                <table class="cheuduleur-table">
                    <thead>
                        ${tableHeader}
                    </thead>
                    <tbody>
                    ${tableBody}
                    </tbody>
                </table>
            </div>
            
        `))

        document.querySelectorAll('.eventDetails').forEach((event) => {
            event.addEventListener('click', (e) =>{
                let service = e.currentTarget.getAttribute('dt-service')
                let event_id = e.currentTarget.getAttribute('dt-event-id')
                alert(`${service} event n° ${event_id}`)
            })
        })

        document.querySelector('button.previous').addEventListener('click', () =>{
            this.navigate(-1)
        })

        document.querySelector('button.next').addEventListener('click', () =>{
            this.navigate(1)
        })

    }

    reset()
    {
        this.divParentElement.innerHTML = ''
    }
    

    navigate(direction){
        this.currentStartDate = new Date(this.currentStartDate.getTime() + 1000 * 3600 * 24 * direction * 7)
        this.currentEndDate = new Date(this.currentEndDate.getTime() + 1000 * 3600 * 24 * direction * 7)
        this.options.startDate = this.currentStartDate
        this.options.endDate = this.currentEndDate
        this.reset()
        this.draw()
    }


    renderEvent(key, el){

        let widthOffset = -100
        let leftOffset = 50

        let slotInWeek = this.slotInCurrentWeek(el.startDate, el.endDate)
        let startDateIndex = slotInWeek[0].getDay()
        let endDateIndex = slotInWeek[1].getDay()
        
        return `
            <div dt-service="${key}" dt-event-id="${el.eventId}" class="eventDetails" style="
            background-color:${el.backgroundColor}80;
            border: 2px solid ${el.backgroundColor};
            width: calc( ${(this.indexMapping[endDateIndex] - this.indexMapping[startDateIndex] + 1) * 100}% + ${widthOffset}%);
            left: calc( ${this.indexMapping[startDateIndex] * 100}% + ${leftOffset}%);
            border-radius: 0.75rem;
            padding: 0.5rem;
            color: ${el.backgroundColor};
            font-weight: bold;
            z-index: 50;
            ">
            ${el.customer}
            </div>
        `
    }

    numberDaysInCurrentWeek(startDate, endDate)
    {
       let left = Math.floor((this.currentStartDate.getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)), right = Math.ceil((new Date(endDate).getTime() - this.currentEndDate.getTime()) / (1000 * 3600 * 24))
       return [ (left <= 0) ? 0 : left, (right <= 0) ? 0 : right]
    }  

    slotInCurrentWeek(startDate, endDate)
    {
        let offsets = this.numberDaysInCurrentWeek(startDate, endDate)
        return [ new Date(new Date(startDate).getTime() + (1000 * 3600 * 24 * offsets[0])), new Date(new Date(endDate).getTime() - (1000 * 3600 * 24 * offsets[1])) ]
    }

    isInCurrentWeek(startDate, endDate) {
        let slots = this.slotInCurrentWeek(startDate, endDate)
        return !(new Date(startDate).getTime() > this.currentEndDate.getTime() || new Date(endDate).getTime() <= this.currentStartDate.getTime())
    }

    currentMonday()
    {
        let currentDate = new Date()
        currentDate = new Date(currentDate.getTime() - (1000 * 3600 * 24 * (currentDate.getDay() - 1)))
        let currentMonday = currentDate.getMonth()+1+'-'+currentDate.getDate()+'-'+currentDate.getFullYear()
        return new Date(currentMonday)
    }

    eventDetails(serviceName, eventId){
        return this.options.events[serviceName].filter((event) => event.eventId === eventId)[0]
    }

    daysNumber()
    {
        let endDate = new Date(this.options.endDate)
        let startDate = new Date(this.options.startDate)
        return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    }

    dayDate(offsetDay)
    {
        let startDate = new Date(this.options.startDate)
        return new Date(new Date(startDate.getTime() + (1000 * 3600 * 24 * offsetDay)))
    }

    stringToHtml(template){
        const parser = new DOMParser()
        const element = parser.parseFromString(template, "text/html")
        return element.body.firstChild
    }


}