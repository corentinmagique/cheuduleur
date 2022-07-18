let test = new Cheuduleur({
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    serviceName: 'Chambres',
    startDate : '07/25/2022',
    endDate : '07/31/2022',
    events: [
        {
            'Chambre 1' : [
                {
                    eventId: 0,
                    startDate: 1,
                    endDate: 2,
                    backgroundColor: '#1abc9c',
                    username: 'Jean'
                },
                {
                    eventId: 1,
                    startDate: 2,
                    endDate: 5,
                    backgroundColor: '#2ecc71',
                    username: 'Jean'
                }
            ]
        },
        {
            'Chambre 2' : [
                {
                    eventId: 2,
                    startDate: 0,
                    endDate: 1,
                    backgroundColor: '#3498db',
                    username: 'Jean'
                },
                {
                    eventId: 3,
                    startDate: 1,
                    endDate: 4,
                    backgroundColor: '#9b59b6',
                    username: 'Jean'
                }
                ,
                {
                    eventId: 3,
                    startDate: 5,
                    endDate: 6,
                    backgroundColor: '#34495e',
                    username: 'Jean'
                }
               
            ]
        },
        {
            'Chambre 3' : [
                {
                    eventId: 4,
                    startDate: 1,
                    endDate: 6,
                    backgroundColor: '#e74c3c',
                    username: 'Jean'
                }
            ]
        }
        
        
    ]
        
})

test.draw()