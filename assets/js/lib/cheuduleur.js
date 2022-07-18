class Cheuduleur
{
    constructor(opts = {}){

        const defaultOptions = {
            divParentSelector: '.cheuduleur',
            days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            daysShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
            serviceName: 'Chambres',
            events: []
        }
    
        this.options = {...defaultOptions, ...opts}
        this.divParentElement = document.querySelector(this.options.divParentSelector)
    }

    draw(){
        let tableHeader = `<th>${this.options.serviceName}</th>`
        let tableBody = ``

        this.divParentElement.classList.add('cheuduleur-container')
        
        for(let i = 0; i <= this.daysNumber();++i)
        {
            // console.log(this.dayDate(i).getDay())
            tableHeader += `<th><span class="text-secondary">${this.options.daysShort[this.dayDate(i).getDay()]}</span> <span>${this.dayDate(i).getDate()}</span></th>`
        }

        this.options.events.forEach((event)=>{
            let key = Object.keys(event)
            let tableElements = `<td>${key}</td>`
            
            this.options.days.forEach((day, index)=>{
                
                let content = ``
                if(index == 0)
                {
                    event[key].forEach((el, index)=>{
                        let neighborhood = this.neighborhood(key, el, event)
                        content += this.renderEvent(key, el, neighborhood)
                    })
                    
                }else
                {
                    content = ``
                }
                tableElements += `<td>${content}</td>`
            })

            let tableRow = `
                <tr>
                    ${tableElements}
                </tr>
            `
            tableBody += tableRow
        })

        this.divParentElement.appendChild(this.stringToHtml(`
            <div>
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

        let smlh = this.options.events

        console.log(Object.keys(smlh[0]))
    }

    renderEvent(key, el, neighborhood){

        let widthOffset = -100
        let leftOffset = 50

        return `
            <div dt-service="${key}" dt-event-id="${el.eventId}" class="eventDetails" style="
            background-color:${el.backgroundColor}85;
            border: 2px solid ${el.backgroundColor};
            width: calc( ${(el.endDate - el.startDate + 1) * 100}% + ${widthOffset}%);
            left: calc( ${el.startDate * 100}% + ${leftOffset}%);
            border-radius: 0.75rem;
            padding: 0.5rem;
            color: ${el.backgroundColor};
            font-weight: bold;
            z-index: 50;
            ">
            ${el.username}
            </div>
        `
    }

    neighborhood(key, event, events)
    {
        return { before : (events[key][events[key].indexOf(event) - 1] && (events[key][events[key].indexOf(event) - 1].endDate == events[key][events[key].indexOf(event)].startDate)) , after : (events[key][events[key].indexOf(event) + 1] && (events[key][events[key].indexOf(event)].endDate == events[key][events[key].indexOf(event) + 1].startDate))}
        
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