let test = new Cheuduleur({
    rows: ['Chambre 1', 'Chambre 2', 'Chambre 3'],
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    serviceName: 'Chambres',
    events: {
        'Chambre 1' : [
            {
                eventId: 0,
                startDate: 0,
                endDate: 3,
                backgroundColor: 'black'
            },
            {
                eventId: 1,
                startDate: 5,
                endDate: 7,
                backgroundColor: 'orange'
            }
        ],
        'Chambre 2' : [
            {
                eventId: 2,
                startDate: 2,
                endDate: 4,
                backgroundColor: 'purple'
            }
        ],
        'Chambre 3' : [
            {
                eventId: 3,
                startDate: 4,
                endDate: 6,
                backgroundColor: 'green'
            }
        ]
    } 
        
})

test.init()
test.draw()