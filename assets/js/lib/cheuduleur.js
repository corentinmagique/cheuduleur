class Cheuduleur
{
    constructor(opts = {}){

        const defaultOptions = {
            divParentSelector: '.cheuduleur',
            type: 'simple',
            days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            daysShort: [ 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'],
            slots: ['8h00', '10h00', '12h00', '14h00', '16h00', '18h00', '20h00'],
            months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            serviceName: 'Chambres',
            customElements: {
                previousButtonContent: 'Previous',
                nextButtonContent: 'Next',
                colorEventPalette: []
            },
            eventClick: (event)=>{
                alert(`Event n°${event.target.getAttribute('dt-event-id')}`)
            },
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

    simpleMode()
    {
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
                        <button class="previous">${this.options.customElements.previousButtonContent}</button>
                        <button class="next">${this.options.customElements.nextButtonContent}</button>
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
            event.addEventListener('click',this.options.eventClick)
        })

        document.querySelector('button.previous').addEventListener('click', () =>{
            this.navigate(-1,7)
        })

        document.querySelector('button.next').addEventListener('click', () =>{
            this.navigate(1,7)
        })
    }

    advancedMode()
    {
        let tableHeader = `<th rowspan="2">${this.options.serviceName}</th>`
        let tableBody = ``

        this.divParentElement.classList.add('cheuduleur-container')

        for(let i = 0; i <= this.daysNumber();++i)
        {
            tableHeader += `<th><span class="text-secondary">${this.options.slots[i]}</span></th>`
        }

        this.options.events.forEach((event, index)=>{
            let key = Object.keys(event)
            let tableElements = `<td style="font-weight:500;color:#3498db">${event.name}</td>`
            let employeesElements = ``
            
            for(let i = 0; i <= this.options.slots.length - 1;++i)
            {
                let content = ``
                tableElements += `<td>${content}</td>`
            }

            event.data.forEach((el)=>{
                let tdEmployees = `<td>${el.name}</td>`
                for(let i = 0; i <= this.options.slots.length - 1;++i)
                {
                    let content = ``
                    if(i == 0)
                    {
                        el.slots.forEach((slot, index)=>{
                            if(this.isInCurrentDay(new Date(slot.startDate)))
                                content += this.renderAdvancedEvent(key, slot)
                        })
                        
                    }else
                    {
                        content = ``
                    }
                
                    tdEmployees += `<td>${content}</td>`
                }
                employeesElements += `<tr>${tdEmployees}</tr>`
            })
            
            let tableRow = `
                <tr style="background-color: #3498db40">
                    ${tableElements}
                </tr>
                ${employeesElements}
            `
            tableBody += tableRow
        })

        this.divParentElement.appendChild(this.stringToHtml(`
            <div>
                <div class="header">
                    <div class="infos">
                       ${this.options.days[this.indexMapping[this.currentStartDate.getDay()]]} ${this.currentStartDate.getDate()} ${this.options.months[this.currentStartDate.getMonth()]} ${this.currentStartDate.getFullYear()}
                    </div>
                    <div class="actions">
                        <button class="previous">${this.options.customElements.previousButtonContent}</button>
                        <button class="next">${this.options.customElements.nextButtonContent}</button>
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

        document.querySelector('button.previous').addEventListener('click', () =>{
            this.navigate(-1,1)
        })

        document.querySelector('button.next').addEventListener('click', () =>{
            this.navigate(1,1)
        })
    }

    draw(){
        if(this.options.type === 'simple')
            this.simpleMode()
        else
            this.advancedMode()
    }

    reset()
    {
        this.divParentElement.innerHTML = ''
    }
    
    navigate(direction, days){
        this.currentStartDate = new Date(this.currentStartDate.getTime() + 1000 * 3600 * 24 * direction * days)
        this.currentEndDate = new Date(this.currentEndDate.getTime() + 1000 * 3600 * 24 * direction * days)
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
            <div dt-service="${key}" dt-event-id="${el.eventId}" class="eventDetails bounce-in" style="
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

    renderAdvancedEvent(key, el){
        let firstTime = this.stringToMs(this.options.slots[0])
        let startDate = this.dateToMs(new Date(el.startDate))
        let index = Math.floor(((startDate - firstTime) / (1000 * 3600)) / 2)
        let leftPos = (startDate * 50) / firstTime
        let width = (el.duration * 100) / 120
        
        return `
            <div dt-service="${key}" dt-event-id="${el.id}" class="eventDetails bounce-in" style="
            background-color:${el.backgroundColor}80;
            border: 2px solid ${el.backgroundColor};
            width: ${width}%;
            left: calc(${leftPos}% + ${index * 100}%);
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

    dateToMs(date)
    {
        return (date.getHours() * 3600 * 1000) + (date.getMinutes() * 60 * 1000)
    }

    stringToMs(string)
    {
        let exploded = string.split(':')
        return (exploded[0] * 3600 * 1000) + (exploded[1] * 60 * 1000)
    }

    numberDaysInCurrentWeek(startDate, endDate)
    {
       let left = Math.ceil((this.currentStartDate.getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)), right = Math.floor((new Date(endDate).getTime() - this.currentEndDate.getTime()) / (1000 * 3600 * 24))
       return [ (left <= 0) ? 0 : left, (right <= 0) ? 0 : right]
    }  

    slotInCurrentWeek(startDate, endDate)
    {
        let offsets = this.numberDaysInCurrentWeek(startDate, endDate)
        return [ new Date(new Date(new Date(startDate).getTime() + (1000 * 3600 * 24 * offsets[0])).toLocaleString('en-US')), new Date(new Date(new Date(endDate).getTime() - (1000 * 3600 * 24 * offsets[1])).toLocaleString('en-US')) ]
    }

    isInCurrentWeek(startDate, endDate) {
        let slots = this.slotInCurrentWeek(startDate, endDate)
        return !(new Date(startDate).getTime() > this.currentEndDate.getTime() || new Date(endDate).getTime() <= this.currentStartDate.getTime())
    }

    isInCurrentDay(date)
    {
        return date.getDate() === this.currentStartDate.getDate() && date.getMonth() === this.currentStartDate.getMonth() && date.getFullYear() === this.currentStartDate.getFullYear()
    }

    currentMonday()
    {
        let currentDate = new Date()
        currentDate = new Date(currentDate.getTime() - (1000 * 3600 * 24 * (currentDate.getDay() - 1)))
        let currentDateInt = parseInt(currentDate.getMonth()) + 1
        let currentMonday = currentDate.getFullYear()+'-'+currentDateInt+'-'+currentDate.getDate()
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

    addLine(table, index, content) {
        let refTable = document.querySelector(table)
        let newLine = refTable.insertRow(index)
        let newCel = newLine.insertCell(0)
        var content = document.createTextNode(content)
        newCel.appendChild(content)
      }

    stringToHtml(template){
        const parser = new DOMParser()
        const element = parser.parseFromString(template, "text/html")
        return element.body.firstChild
    }

}