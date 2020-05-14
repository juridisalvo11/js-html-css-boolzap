//Intercetto click sul pulsante invia
$('.microphone > i').click(send_message);

//Imposto il tasto 'enter' per inviare il messaggio
$('.insert-message').keypress(function(event) {
    var key = event.which;
    if (key == 13) {
        send_message()
    }
})

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
//Intercetto il click sul un contatto
$('.single-contact').click(function(){
    //Recupero il valore dell'attributo data-chat del contatto cliccato
    var visible_chat = $(this).attr('data-chat');
    console.log('posizione chat: ' + visible_chat);
    //tolgo la classe active a tutti i div messages-box con il data corrispondente
    $('.messages-box').removeClass('active');
    //Per dar si che la chat selezionata abbia il background grigio
    //Selezioni i single-contact rimuovendo la classe active
    $('.single-contact').removeClass('active')
    //Aggiungo la classe active al this (single contact) corrente
    $(this).addClass('active');
    //Recupero il messages-box con lo stesso data del single-contact cliccato e aggiungo la classe active
    $('.messages-box').each(function(){
        var current_messages = $(this).attr('data-chat')
        console.log('posizione messaggi: ' + current_messages);

        if(visible_chat == current_messages) {
            $(this).addClass('active');
        }
    })

    //Recupero il nome del contatto cliccato
    var contact_name = $(this).find('.name').text();
    var time = $(this).find()
    //Inserisco il nome del contatto corrente nell'header della chat che sto visualizzando
    $('.name-chat').text(contact_name)
    //Recupero il percorso del'immagine del contatto
    var contact_img = $(this).find('.saved-chat img').attr('src');
    //Imposto il percorso dell'header della chat dove inserirò l'immagine corrente
    $('.friend-chat img').attr('src', contact_img)
})







//Intercetto il click sull'icona-dropdawn del template
$('.messages-box').on('click', '.icona-dropdown', function() {
    //recupero il div options-message corrispondente al messaggio cliccato
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

function send_message() {
    //leggo il testo del messaggio inserito dall'utente
    var messaggio_ricevuto = $('.insert-message').val();
    if (messaggio_ricevuto.trim() != '') {
        //Copio l'elemento template relativo al messaggio di risposta
        var current_message = $('.template .message').clone();
        //Inserisco il testo letto dall'input
        current_message.find('.message-text').text(messaggio_ricevuto);
        //Aggiungo classe received per dare lo stile al messaggio ricevuto
        current_message.addClass('received');
        //Aggiungo il nuovo messaggio alla chat con il comando append
        $('.messages-box.active .chat-container').append(current_message);
        //Svuoto l'input
        $('.insert-message').val('');

        //Imposto una funzione timeout per permettere al messaggio di risposta di apparire dopo un certo intervallo di tempo
        setTimeout(function(){
            //Copio l'elemento template relativo al messaggio inviato
            var answer_message = $('.template .message').clone();
            //Cerco il tag giusto dove inserire il messaggio
            answer_message.find('.message-text').text('Ok')
            //Vado ad aggiungere la classe 'sent' in modo da dare lo stile al messaggio
            answer_message.addClass('sent');
            //con il comando append vado ad inserire il messaggio completo nel contenitore
            $('.messages-box.active .chat-container').append(answer_message);
            //imposto il tempo di intervallo della risposta
        }, 1000);
    }
}
