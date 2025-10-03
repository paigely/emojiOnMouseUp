/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 sadan
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

const replacement = {
    match: /onClick:(\i\?void 0:\i)/,
    replace: "$&,onMouseUp:$1"
};

const settings = definePluginSettings({
    applyOnAllItems: {
        type: OptionType.BOOLEAN,
        description: "Whether to apply mouse up for all menu items, not just emojis",
        default: false,
        restartNeeded: true
    }
});

export default definePlugin({
    name: "EmojiOnMouseUp",
    description: "Sends the emoji you are hovering when you take your mouse button up.",
    settings,
    authors: [
        Devs.sadan,
        {
            name: "perfect.symmetry",
            id: 1375697625864601650n
        },
    ],
    patches: [
        { find: ".customItem;", replacement },
        {
            find: ",subMenuIconClassName:",
            replacement,
            predicate: () => settings.store.applyOnAllItems
        }
    ]
});
