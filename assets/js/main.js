let test = new Cheuduleur({
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
                    name : 'Chambre 1',
                    data: [
                        {
                            eventId: 45,
                            startDate: '2022-07-11',
                            endDate: '2022-07-23',
                            backgroundColor: '#1abc9c',
                            customer: 'Antilope'
                        },
                        {
                            eventId: 78,
                            startDate: '2022-07-23',
                            endDate: '2022-07-26',
                            backgroundColor: '#e74c3c',
                            customer: 'Escalope'
                        }
                    ]
                },
                {
                    id : 789,
                    name : 'Chambre 2',
                    data: [
                    ]
                },{
                    id : 10,
                    name : 'Chambre 3',
                    data: [
                    ]
                },{
                    id : 10,
                    name : 'Chambre 4',
                    data: [
                    ]
                },{
                    id : 10,
                    name : 'Chambre 5',
                    data: [
                        
                    ]
                },{
                    id : 10,
                    name : 'Chambre 6',
                    data: [
                        {
                            eventId: 45,
                            startDate: '2022-07-11',
                            endDate: '2022-07-20',
                            backgroundColor: '#e67e22',
                            customer: 'Antilope'
                        },
                        {
                            eventId: 78,
                            startDate: '2022-07-23',
                            endDate: '2022-07-24',
                            backgroundColor: '#9b59b6',
                            customer: 'Escalope'
                        }
                    ]
                }
            ]
        
})

test.draw()