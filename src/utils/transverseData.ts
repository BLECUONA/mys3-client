let instance: TransverseData | null = null;


class TransverseData {

    token: string;

    constructor() {
        if (!instance) {
            instance = this;
        }
        this.token = "";

        return instance;
    }

    get Token(): string {
        return this.token;
    }

    set Token(token: string) {
        this.token = token;
    }
}

export default TransverseData;