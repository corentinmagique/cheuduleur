let test = new Cheuduleur({
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    serviceName: 'Chambres',
    // startDate : new Date('07-25-2022'),
    // endDate : new Date('07-30-2022'),
    events: [
                {
                    id : 10,
                    name : 'Chambre 1',
                    data: [
                        {
                            eventId: 45,
                            startDate: '07-11-2022',
                            endDate: '07-23-2022',
                            backgroundColor: '#1abc9c',
                            customer: 'Antilope'
                        },
                        {
                            eventId: 78,
                            startDate: '07-23-2022',
                            endDate: '07-26-2022',
                            backgroundColor: '#e74c3c',
                            customer: 'Escalope'
                        }
                    ]
                },
                {
                    id : 789,
                    name : 'Chambre 2',
                    data: [
                        {
                            eventId: 60,
                            startDate: '07-18-2022',
                            endDate: '09-30-2022',
                            backgroundColor: '#f39c12',
                            customer: 'Chenasse'
                        }
                    ]
                },{
                    id : 10,
                    name : 'Chambre 1',
                    data: [
                        {
                            eventId: 45,
                            startDate: '07-11-2022',
                            endDate: '08-08-2022',
                            backgroundColor: '#9b59b6',
                            customer: 'Antilope'
                        },
                        {
                            eventId: 78,
                            startDate: '07-23-2022',
                            endDate: '07-24-2022',
                            backgroundColor: '#e74c3c',
                            customer: 'Escalope'
                        }
                    ]
                },{
                    id : 10,
                    name : 'Chambre 1',
                    data: [
                        {
                            eventId: 45,
                            startDate: '07-11-2022',
                            endDate: '07-23-2022',
                            backgroundColor: '#1abc9c',
                            customer: 'Antilope'
                        },
                        {
                            eventId: 78,
                            startDate: '07-23-2022',
                            endDate: '07-24-2022',
                            backgroundColor: '#e74c3c',
                            customer: 'Escalope'
                        }
                    ]
                },{
                    id : 10,
                    name : 'Chambre 1',
                    data: [
                        {
                            eventId: 45,
                            startDate: '08-05-2022',
                            endDate: '08-23-2022',
                            backgroundColor: '#1abc9c',
                            customer: 'Antilope'
                        },
                        {
                            eventId: 78,
                            startDate: '07-23-2022',
                            endDate: '07-24-2022',
                            backgroundColor: '#e74c3c',
                            customer: 'Escalope'
                        }
                    ]
                },{
                    id : 10,
                    name : 'Chambre 1',
                    data: [
                        {
                            eventId: 45,
                            startDate: '07-11-2022',
                            endDate: '07-20-2022',
                            backgroundColor: '#e67e22',
                            customer: 'Antilope'
                        },
                        {
                            eventId: 78,
                            startDate: '07-23-2022',
                            endDate: '07-24-2022',
                            backgroundColor: '#e74c3c',
                            customer: 'Escalope'
                        }
                    ]
                }
            ]
        
})

test.draw()