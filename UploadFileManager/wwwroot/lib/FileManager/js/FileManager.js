document.addEventListener('alpine:init', () => {
    Alpine.data('fm_upload', () => ({
        _setting: {
            baseUrl: '/filemanager',
            ajaxParam: {
                cmd: '',
                value: '',
                secondaryValue: '', //bien phu 
            },

            setParams(cmd, value = '', secondaryValue = '') {
                this.ajaxParam.cmd = cmd;
                this.ajaxParam.value = value;
                this.ajaxParam.secondaryValue = secondaryValue;
            },
            //tao url dang filemanager?cmd=GET_ALL_DIR&value, phia truoc dau = la key, phia sau dau = la value
            getUrl() {
                return `${this.baseUrl}?${new URLSearchParams(this.ajaxParam)}`;
            }
        },

        _folderTree: [
            {
                level: 1,
                fullPath: '',
                folderName: '',
                isOpen: true,
                cssClass: {},
            }
        ],

        init() {
            this._setting.setParams("GET_ALL_DIR");
            fetch(this._setting.getUrl())
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    this._folderTree = json.data.map(path => {
                        var tempArr = path.split("\\");
                        return {
                            folderName: tempArr[tempArr.length - 1], // phan tu cuoi
                            fullPath: path,
                            level: tempArr.length,
                            isOpen: false,
                            cssClass: {
                                [`folder-level-${tempArr.length}`]: true,
                                show: false
                            }
                        }
                    });
                    console.log(this._folderTree);
                });
        },

        toggleFolder(idx) {
            //Hien thi nhung folder co level lon hon level hien tai 1 bat
            var currrentLevel = this._folderTree[idx].level;
            if (idx >= this._folderTree.length) {
                return;
            }

            this._folderTree[idx].isOpen = !this._folderTree[idx].isOpen;
            var currrentLevel = this._folderTree[idx].level;
            this.openFolder(idx, currrentLevel);
        },

        openFolder(idx, maxLevel) {
            var isOpen = this._folderTree[idx].isOpen;

            if (isOpen) {
                // open folder 
                while (idx + 1 < this._folderTree.length && this._folderTree[idx + 1].level > maxLevel) {
                    if (maxLevel + 1 == this._folderTree[idx + 1].level) {
                        this._folderTree[idx + 1].cssClass.show = true;
                        if (this._folderTree[idx + 1].isOpen) {
                            // xu ly folder tree bang de quy 
                            this.openFolder(idx + 1, this._folderTree[idx + 1].level);
                        }
                    }
                    idx++;
                }
            } else {
                // xu ly dong thu muc 
                while (idx + 1 < this._folderTree.length && this._folderTree[idx + 1].level > maxLevel) {
                    this._folderTree[idx + 1].cssClass.show = false;
                    idx++;
                }
            }
        },
    }));
});
