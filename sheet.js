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

$('.single-contact').click(function(){
    $('.messages-box').removeClass('active');
    // $('.friend-chat-left').removeClass('active');
    $('.single-contact').removeClass('grey');
    var contact_box = $(this).index();



    $('.messages-box').eq(contact_box).addClass('active');
    // $('.friend-chat-left').eq(contact_box).addClass('active');
    $('.single-contact').eq(contact_box).addClass('grey');
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
        $('.chat-container').append(current_message);
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
            $('.chat-container').append(answer_message);
            //imposto il tempo di intervallo della risposta
        }, 1000);

        $('.fa-check-double').click(function(){
            $('.options-message').toggleClass('active');

            $('.delete').click(function(){
                $(current_message).remove()
            });
        })
    }
}
