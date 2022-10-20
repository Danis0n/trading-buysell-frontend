export default class superImage {
    file = {} as File;
    url = {} as string;

    constructor(file: File, url: string){
        this.file = file;
        this.url = url;
    }

    setFile(file: File){
        this.file = file
    }

    setUrl(url : string){
        this.url = url
    }

    getFile() : File {
        return this.file
    }

    getUrl() : string {
        return this.url;
    }

}