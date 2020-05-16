class InvalidLobbyCodeError extends Error{
    constructor(msg: string) {
        super(msg);
    }
}

export default InvalidLobbyCodeError;