let test = new Cheuduleur({
    type: 'advanced',
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    slots: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    serviceName: 'Massages',
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
                            name : 'J. Hughes',
                            slots: [
                                {
                                    id : 1,
                                    startDate : '2022/07/18 19:00',
                                    duration: 30,
                                    backgroundColor: '#1abc9c',
                                    customer: 'A'
                                },
                                {
                                    id : 1,
                                    startDate : '2022/07/21 10:26',
                                    duration: 30,
                                    backgroundColor: '#e74c3c',
                                    customer: 'A'
                                }

                            ]
                        },
                        {
                            id : 1,
                            name : 'C. Payet',
                            slots: [
                                {
                                    id : 1,
                                    startDate : '2022/07/21 10:00',
                                    duration: 30,
                                    backgroundColor: '#1abc9c',
                                    customer: 'B'
                                },
                                {
                                    id : 1,
                                    startDate : '2022/07/21 15:00',
                                    duration: 30,
                                    backgroundColor: '#e74c3c',
                                    customer: 'B'
                                },
                            ]
                        }
                    ]
                },
                {
                    id : 10,
                    name : 'Massage Clébard',
                    data: [
                        {
                            id : 1,
                            name : 'M. Jardinot',
                            slots: [
                                {
                                    id : 1,
                                    startDate : '2022/07/21 08:00',
                                    duration: 30,
                                    backgroundColor: '#1abc9c',
                                    customer: 'C'
                                },
                                {
                                    id : 1,
                                    startDate : '2022/07/21 12:30',
                                    duration: 30,
                                    backgroundColor: '#e74c3c',
                                    customer: 'C'
                                },
                            ]
                        }
                    ]
                },
                {
                    id : 10,
                    name : 'Massage En Graine',
                    data: [
                        {
                            id : 1,
                            name : 'M. Plucheur',
                            slots: [
                                {
                                    id : 1,
                                    startDate : '2022/07/21 08:20',
                                    duration: 30,
                                    backgroundColor: '#1abc9c',
                                    customer: 'D'
                                },
                                {
                                    id : 1,
                                    startDate : '2022/07/21 16:20',
                                    duration: 30,
                                    backgroundColor: '#e74c3c',
                                    customer: 'D'
                                },
                            ]
                        },
                        {
                            id : 1,
                            name : 'Mme. Bigdog',
                            slots: [
                                {
                                    id : 1,
                                    startDate : '2022/07/21 14:56',
                                    duration: 30,
                                    backgroundColor: '#1abc9c',
                                    customer: 'E'
                                },
                                {
                                    id : 1,
                                    startDate : '2022/07/21 18:20',
                                    duration: 30,
                                    backgroundColor: '#e74c3c',
                                    customer: 'E'
                                },
                            ]
                        }
                    ]
                }
            ]
        
})

test.draw()