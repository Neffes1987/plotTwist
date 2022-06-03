import { Easing, Notifier, NotifierComponents } from 'react-native-notifier';

export class UINotifier {
  events: Record<'ok' | 'cancel', Function[]> = {
    ok: [],
    cancel: [],
  };

  setListener(eventType: 'ok' | 'cancel', callback: Function): void {
    this.events[eventType].push(callback);
  }

  showPrompt(caption: string, text: string): void {
    Notifier.showNotification({
      title: caption,
      description: text,
      duration: 0,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,

      onHidden: () => {
        if (this.events.cancel.length) {
          this.events.cancel.forEach((callback: Function) => callback());
        }
      },
      onPress: () => {
        if (this.events.ok.length) {
          this.events.ok.forEach((callback: Function) => callback());
        }
      },
      hideOnPress: false,
    });
  }

  showMessage(caption: string, text: string, isError = true): void {
    Notifier.showNotification({
      title: caption,
      description: text,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: isError ? 'error' : 'success',
      },
    });
  }
}
const notifier = new UINotifier();

export default notifier;
