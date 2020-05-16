class InvalidLobbyOwnerError extends Error{
    constructor(msg: string) {
        super(msg);
    }
}

export default InvalidLobbyOwnerError;