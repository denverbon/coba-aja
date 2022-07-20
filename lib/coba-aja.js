'use babel';

import CobaAjaView from './coba-aja-view';
import { CompositeDisposable } from 'atom';

export default {

  cobaAjaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cobaAjaView = new CobaAjaView(state.cobaAjaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cobaAjaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'coba-aja:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cobaAjaView.destroy();
  },

  serialize() {
    return {
      cobaAjaViewState: this.cobaAjaView.serialize()
    };
  },

  toggle() {
    console.log('CobaAja was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
