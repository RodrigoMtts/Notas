import PushNotification, {Importance} from "react-native-push-notification"

let navegador;
class NotificationManager {
    setNavegador(novoConteudo){
        navegador = novoConteudo;
    }

    criarCanal = () => {
        PushNotification.createChannel(
            {
                channelId: "channel-id", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: false, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }
    // Configuração orientada pela documentação do React Native Push Notification
    // Essa configuração garante o funcionamento da biblioteca no Android e no iOS
    configure = () => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[NotificationManager] onRegister token:", token);
            },
            onAction: function(notification){
                console.log("ACTION", notification.action)
            },
            onNotification: function (notification) {
                navegador.navigate("Redirect");
            }
        })
    }

    // É aqui que nossa notificação para o Android é construida
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            channelId: "channel-id",
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data
        }
    }

    // Fução que exibe a notificação
    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Propriedades do Android */
            ...this.buildAndroidNotification(id, title, message, data, options),

            /* Propriedades do Android e iOS */
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false
        })
    }

    // Função que cancela todas notiificações e limpa as que estão no centro de notificações
    cancelAllLocalNotification = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    
    agendarNotificacao(date) {
        console.log("Notificação agendada")
        /* Para agendar outra notificação, basta copiar o código daqui...*/
        PushNotification.localNotificationSchedule({
            id: 1,
            date: new Date(Date("2021-05-28 22:00:00")),//5 minutos
            channelId: 'channel-id',
            title: "Lembrete: ",
            message: "note.content",
            allowWhileIdle: false,
            //repeatType: 'time',
            //repeatTime: 10 * 1000,
            color: "#FF4141"
        })
    }
}

export const notificationManager = new NotificationManager();