import { Alert } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import messageService from '../services/MessageService';


const MessageSound = async () => {
    messageService.unRead((err, response) => {
        if (response && response.data) {
            const messages = response.data.data;
            messages && messages.length > 0 && messages.forEach(async (message) => {
                const { id, first_name, last_name, recent_last_message } = message;
                if (recent_last_message) {
                    try {
                        try {
                            const desiredVolume = 1;
                            await SystemSetting.setVolume(desiredVolume, { type: 'music' });
                        } catch (error) {
                            console.error('Error setting media volume:', error);
                        }
                        
                      
                    } catch (error) {
                        console.log('Error loading and playing sound:', error);
                    }

                    await new Promise(async (resolve) => {
                        Alert.alert(
                            'New Message Received',
                            `${first_name} ${last_name}: ${recent_last_message}`,
                            [
                                {
                                    text: 'OK',
                                    onPress: async () => {
                                        resolve();
                                        await messageService.update(id, null, (err, response) => { });
                                    },
                                },
                            ]
                        );
                    });
                }
            });
        }
    });



};

export default MessageSound;
