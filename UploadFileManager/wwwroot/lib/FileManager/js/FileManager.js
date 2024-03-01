document.addEventListener('alpine:init', () => {
    Alpine.data('fm_upload', () => ({
        _setting: {
        baseUrl: '/filemanager/getalldir',
            ajaxParam: {
                cdm: '',
                value: '',
                tempValue: '', //bien phu 
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
            fetch(this._setting.baseUrl)
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    this._folderTree = json.map(path => {
                        var tempArr = path.split("\\");
                        return {
                            folderName: tempArr[tempArr.length - 1], // phan tu cuoi
                            fullPath: path,
                            level: tempArr.length,
                            isOpen: false,
                            cssClass: {
                                [`folder-level-${tempArr.length}`]: true ,
                                show: false
                            }
                        }
                    });
                    console.log(this._folderTree);
                });
        },

        toggleFolder(idx) {
            console.log(this.$el);
            //Hien thi nhung folder co level lon hon level hien tai 1 bat
            var currrentLevel = this._folderTree[idx].level;
            if (idx >= this._folderTree.length) {
                return;
            }

            this._folderTree[idx].isOpen = !this._folderTree[idx].isOpen;
            var currrentLevel = this._folderTree[idx].level;
            var isOpen = this._folderTree[idx].isOpen; 

            while(idx +1 < this._folderTree.length && this._folderTree[idx + 1].level > currrentLevel) {
                if (this._folderTree[idx + 1].level == currrentLevel + 1) {
                    this._folderTree[idx + 1].cssClass.show = isOpen;
                }
                idx++;
            }
        },
    }));
});
