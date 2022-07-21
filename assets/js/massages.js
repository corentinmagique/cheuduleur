let test = new Cheuduleur({
    type: 'advanced',
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    serviceName: 'Chambres',
    customElements: {
        previousButtonContent: '<span class="material-icons-outlined">navigate_before<span>',
        nextButtonContent: '<span class="material-icons-outlined">navigate_next<span>'
    },
    eventClick: function(event){
        alert(`Event n°${event.target.getAttribute('dt-event-id')}`)
    },
    events: [
                {
                    id : 10,
                    name : 'Massage Thermique',
                    data: [
                        {
                            id : 1,

                        }
                    ]
                },
                {
                    id : 10,
                    name : 'Massage Clébard',
                    data: [
                        
                    ]
                }
            ]
        
})

test.draw()