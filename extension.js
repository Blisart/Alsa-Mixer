const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const GLib = imports.gi.GLib;
const ByteArray = imports.byteArray;
const Mainloop = imports.mainloop;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const SPEAKER_ICON = "sp.svg";
const HEADPHONE_ICON = "hp.svg";

// amixer -c 2 set 'Output Select' 'Speakers'
const OUTPUT_ITEMS = {
    0: 'Speakers',
    1: 'Headphone'
}
const MIXER_ELEMENT = 'Output Select';

let button, icon, gicon_speakers, gicon_headphone;

function init(metadata) {
}

function toggleOutput() {
    let [ok, out, err, exit] = GLib.spawn_command_line_sync("amixer -c 2 get '" + MIXER_ELEMENT + "'");

    if (ByteArray.toString(out).includes('Item0: \'Headphone\'')) {
        icon.set_gicon(gicon_headphone)
    } else {
        icon.set_gicon(gicon_speakers)
    }
}


function enable() {
    button = new PanelMenu.Button(0.0);
    icon = new St.Icon({ style_class: 'system-status-icon' });
    gicon_speakers = Gio.icon_new_for_string(Me.path + "/icons/" + SPEAKER_ICON);
    gicon_headphone = Gio.icon_new_for_string(Me.path + "/icons/" + HEADPHONE_ICON);

    let [ok, out, err, exit] = GLib.spawn_command_line_sync("sh -c 'cat /sys/bus/hid/devices/*17EF\:604*/fn_lock'");

    if (ByteArray.toString(out).includes('Item0: \'Headphone\'')) {
        GLib.spawn_command_line_sync("amixer -c 2 set '" + MIXER_ELEMENT + "' '" + OUTPUT_ITEMS["1"] + "'")
        icon.set_gicon(gicon_headphone)
    } else {
        GLib.spawn_command_line_sync("amixer -c 2 set '" + MIXER_ELEMENT + "' '" + OUTPUT_ITEMS["0"] + "'")
        icon.set_gicon(gicon_speakers)
    }

    button.actor.add_actor(icon);
    button.actor.connect('button-press-event', toggleOutput);
    Main.panel.addToStatusArea('OutputDevice', button);
}


function disable() {
    button.destroy();
    button = null;
    icon = null;
    gicon_speakers = null;
    gicon_headphone = null;
}

