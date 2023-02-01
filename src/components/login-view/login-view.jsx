export const LoginView = () => {
    return (
        <form>
            <label>
                Username:
                <input type="text" />
            </label>
            <label>
                Password:
                <input type="passowrd" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};