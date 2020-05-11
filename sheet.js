//Intercetto click sul pulsante invia
$('.microphone > i').click(function() {
    //leggo il testo del messaggio inserito dall'utente
    var messaggio_ricevuto = $('.insert-message').val();
    //Inserisco il testo letto dall'input
    $('.template .message-text').text(messaggio_ricevuto);
    //Copio l'elemento template
    var current_message = $('.template .received').clone();
    //Aggiungo il nuovo messaggio alla chat con il comando append
    $('.chat-container').append(current_message);

})

$('.insert-message').keypress(function(event) {
    var key = event.which;
    if (key == 13) {
        //leggo il testo del messaggio inserito dall'utente
        var messaggio_ricevuto = $('.insert-message').val();
        //Inserisco il testo letto dall'input
        $('.template .message-text').text(messaggio_ricevuto);
        //Copio l'elemento template
        var current_message = $('.template .received').clone();
        //Aggiungo il nuovo messaggio alla chat con il comando append
        $('.chat-container').append(current_message);
    }
})
