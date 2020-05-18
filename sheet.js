//AGGIUNTA DI UN MESSAGGIO CON IL PULSANTE INVIO E CON IL TASTO ENTER + RISPOSTA INTERLOCUTORE (PASSAGGI INSERITI NELLA FUNZIONE SEND_MESSAGE)

//Intercetto click sul pulsante invia
$('.microphone > i').click(send_message)

//Imposto il tasto 'enter' per inviare il messaggio
$('.insert-message').keypress(function(event) {
    var key = event.which;
    if (key == 13) {
        send_message()
    }

})

//CAMBIO ICONA DA ICONA MICROFONO AD ICONA INVIO MESSAGGIO

//Vado ad intercettare il focus sull'input invio messaggio
$('.insert-message').focus(function(){
    //Rimuovo la classe dell'icona "microfono" e aggiungo quella dell'icona "invia messaggio" in modo da far apparire l'icona corrispondente
    $('.microphone i').removeClass('fa-microphone').addClass('fa-paper-plane');
})

//vado ad impostare la funzione 'blur per far si che torni visibile l'icona 'microfono'
$('.insert-message').blur(function(){
    //Rimuovo la classe dell'icona "invia messaggio" e aggiungo quella dell'icona "microfono" in modo da far apparire l'icona corrispondente
    $('.microphone i').removeClass('fa-paper-plane').addClass('fa-microphone');
})

//RICERCA UTENTI

//Intercetto click dell'utente sul tasto Cerca
$('.start-chat').keyup(function() {
    //vado a leggere ciò che l'utente ha scritto nell'input
    var research = $('.start-chat').val().trim().toLowerCase();
    //controllo se lìutente ha scritto qualcosa
    if (research != '') {
        //Vado a controllare ogni elemeneto in lista per vedere se c'è una corrispondenza con quello digitato dall'lìutente
        $('.chat-box').each(function() {
            var chat_name = $(this).find('.name').text().toLowerCase();
            //Se la ricerca dell'utente trova una corrispondenza mostrala
            if (chat_name.search(research) != -1) {
                $(this).show();
            //Trovata la corrispondenza nascondi le altre
            } else {
                $(this).hide();
            }
        })

    } else {
        //quando lìinput di ricerca diventa di nuovo vuoto tornano visibili tutti i contatti
        $('.chat-box').show();
    }

})

//CLICK SUL CONTATTO PER MOSTRARE CONVERSAZIONE CORRISPONDENTE

//Intercetto il click sul un contatto
$('.single-contact').click(function(){
    //Recupero il valore dell'attributo data-chat del contatto cliccato
    var visible_chat = $(this).attr('data-chat');
    // console.log('posizione chat: ' + visible_chat);
    //tolgo la classe active a tutti i div messages-box con il data corrispondente
    $('.messages-box').removeClass('active');
    //Per Far si che la chat selezionata abbia il background grigio
    //Seleziono i single-contact rimuovendo la classe grey
    $('.single-contact').removeClass('grey')
    //Aggiungo la classe grey al this (single contact corrente)
    $(this).addClass('grey');
    //Recupero il messages-box con lo stesso data del single-contact cliccato e aggiungo la classe active
    $('.messages-box').each(function(){
        var current_messages = $(this).attr('data-chat')
        // console.log('posizione messaggi: ' + current_messages);

        if(visible_chat == current_messages) {
            $(this).addClass('active');
        }
    })
    //Sostituzione nome, immagine e ore header con dati chat corrente
    //Recupero il nome del contatto cliccato
    var contact_name = $(this).find('.name').text();
    //Inserisco il nome del contatto corrente nell'header della chat che sto visualizzando
    $('.name-chat').text(contact_name)
    //recupero l'ora del contatto cliccato
    var time = $(this).find('.time').text();
    //vado a sostituire l'ora corrispondente con quella dell'header
    $('.time-header').text(time)
    //Recupero il percorso del'immagine del contatto
    var contact_img = $(this).find('.saved-chat img').attr('src');
    //Imposto il percorso dell'header della chat dove inserirò l'immagine corrente
    $('.friend-chat img').attr('src', contact_img)
})

//CREAZIONE MENU' DROPDOWN PER ELIMINARE MESSAGGI

//Intercetto il click sull'icona-dropdawn del template
$('.messages-box').on('click', '.icona-dropdown', function() {
    //recupero il div options-message corrispondente al messaggio cliccato e con toggleClass vado ad aggiungere e a rimuovere la classe active
    $(this).siblings('.options-message').toggleClass('active')
})

//Intercetto il click su delete per cancellare il messaggio
$('.messages-box').on('click', '.delete', function(){
    //recupero l'elemento con classe delete per cancellare il messaggio
    $(this).closest('.message').remove()
})

//Utilizzo la funzione mouseleave sul div message per chiudere automaticamente il dropdown
$('.messages-box').on('mouseleave', '.message', function(){
    $('.options-message.active').removeClass('active');
})

//FUNZIONE PER INVIARE MESSAGGI
function send_message() {
    //Andiamo a salvare il template in una variabile
    var source = $('#entry-template').html();
    //console.log(source);
    //Tramite la libreria handlebars andiamo a inserire il notro template in una funzione per poi compilarlo
    var template = Handlebars.compile(source);
    //Creiamo l'oggetto messaggio che andiamo a compilare inserendo i dati collegati al template e andiamo ad inserirli nei segnaposti corrispondenti
    var messaggio = {
        'text' : $('.insert-message').val(),
        'time-hour' : '15.00',
        'classe' : 'received',
    }
        // console.log(message_handlebars.testo);
    //Inseriamo il contenuto in pagina inserendo l'oggetto nella variabile che rappresenta la funzione di handlebars
    var html_finale = template(messaggio);
    $('.messages-box.active .chat-container').append(html_finale);

    $('.insert-message').val('');


        setTimeout(function(){

            var messaggio2 = {
                'text' : 'ok',
                'time-hour' : '15.15',
                'classe' : 'sent',
            }
                // console.log(message_handlebars.testo);
            var html_finale2 = template(messaggio2);
            $('.messages-box.active .chat-container').append(html_finale2)

            //imposto il tempo di intervallo della risposta
        }, 1000);
}
