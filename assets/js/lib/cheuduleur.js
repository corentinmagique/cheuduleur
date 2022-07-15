class Cheuduleur
{
    constructor(opts = {}){

        const defaultOptions = {
            divParentSelector: '.cheuduleur',
            rows: [],
            days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            daysShort: ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'],
            serviceName: 'Chambres',
            events: []
        }
    
        this.options = {...defaultOptions, ...opts}
        this.divParentElement = document.querySelector(this.options.divParentSelector)
        this.eventsMatrix = Array(this.options.rows.length).fill().map(()=>Array(this.options.days.length).fill())
    }

    init(){

        this.options.rows.forEach((row, n) => {
            let eventsObjects = this.options.events[row]
            let keys = Object.keys(this.options.events)

            this.options.days.forEach((day, index) => {

                if(eventsObjects)
                {
                    eventsObjects.forEach(event => {
                        if(index >= event.startDate && index <= event.endDate && n == keys.indexOf(row))
                            this.eventsMatrix[n][index] = event.eventId
                        
                    })
                }
                
            })
            
        })

        console.log(this.eventsMatrix)

    }

    draw(){
        let tableHeader = `<th>${this.options.serviceName}</th>`
        let tableBody = ``, events = ``

        this.divParentElement.classList.add('cheuduleur-container')
        
        this.options.days.forEach(day => {
            tableHeader += `<th>${day}</th>`
        })

        this.options.rows.forEach((row, n) => {
            let tableElements = `<td>${row}</td>`
            let eventElements = `<td>${row}</td>`
            let eventsObjects = this.options.events[row]
            let keys = Object.keys(this.options.events)

            this.options.days.forEach((day, index) => {
                let borderStyle = ``
                let colspan = ``
                tableElements += `<td></td>`
                if(this.eventsMatrix[n][index]!=undefined)
                {
                    let eventDetail = this.eventDetails(row,this.eventsMatrix[n][index])
                    eventElements += `<td style="background-color: ${eventDetail.backgroundColor};border-color:${eventDetail.backgroundColor};"></td>`
                }else eventElements += `<td></td>`
                
                
            })
            let tableRow = `
                <tr>
                    ${tableElements}
                </tr>
            `
            let eventRow = `
                <tr>
                    ${eventElements}
                </tr>
            `
            tableBody += tableRow
            events += eventRow
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

        this.divParentElement.appendChild(this.stringToHtml(`
            <div>
                <table class="cheuduleur-events">
                    <thead>
                        ${tableHeader}
                    </thead>
                    <tbody>
                        ${events}
                    </tbody>
                </table>
            </div>
            
        `))

        document.querySelectorAll('.eventDetails').forEach((event) => {
            
            event.addEventListener('click', (e) =>{
                let event_id = e.currentTarget.getAttribute('dt-event-id')
                alert(event_id)
            })
        })
    }

    eventDetails(serviceName, eventId){
        return this.options.events[serviceName].filter((event) => event.eventId === eventId)[0]
    }

    stringToHtml(template){
        const parser = new DOMParser()
        const element = parser.parseFromString(template, "text/html")
        return element.body.firstChild
    }


}