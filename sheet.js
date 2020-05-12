//Intercetto click sul pulsante invia
$('.microphone > i').click(function() {
    //leggo il testo del messaggio inserito dall'utente
    var messaggio_ricevuto = $('.insert-message').val();
    if (messaggio_ricevuto != '') {
        //Copio l'elemento template
        var current_message = $('.template .message').clone();
        //Inserisco il testo letto dall'input
        current_message.find('.message-text').text(messaggio_ricevuto);
        //Aggiungo classe received per dare lo stile al messaggio ricevuto
        current_message.addClass('received');
        //Aggiungo il nuovo messaggio alla chat con il comando append
        $('.chat-container').append(current_message);
        //Svuoto l'input
        $('.insert-message').val('');

        setTimeout(function(){
            var answer_message = $('.template .message').clone();

            answer_message.find('.message-text').text('Ok')

            answer_message.addClass('sent');

            $('.chat-container').append(answer_message);

        }, 1000);
    }




})

$('.insert-message').keypress(function(event) {
    var key = event.which;
    if (key == 13) {
        send_message()
    }
})

//Intercetto click dell'utente sul tasto Cerca
$('.search-message').click(function() {
    //vado a leggere ciò che l'utente ha scritto nell'input
    var search = $('.start-chat').val().trim();
    //controllo se lìutente ha scritto qualcosa
    if (search != '') {
        //Vado a controllare ogni elemeneto in lista per vedere se c'è una corrispondenza con quello digitato dall'lìutente
        $('.name').each(function() {
            var chat_name = $(this).text();

            if (chat_name == search) {
                $(this).show();

            } else {
                $(this).hide();
            }
        })
    } else {
        $('.name').show();
    }

})

function send_message() {
    //leggo il testo del messaggio inserito dall'utente
    var messaggio_ricevuto = $('.insert-message').val();
    if (messaggio_ricevuto != '') {
        //Copio l'elemento template
        var current_message = $('.template .message').clone();
        //Inserisco il testo letto dall'input
        current_message.find('.message-text').text(messaggio_ricevuto);
        //Aggiungo classe received per dare lo stile al messaggio ricevuto
        current_message.addClass('received');
        //Aggiungo il nuovo messaggio alla chat con il comando append
        $('.chat-container').append(current_message);
        //Svuoto l'input
        $('.insert-message').val('');
    }
}
