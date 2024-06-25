import { useAuth } from "../contexts/AuthContext";

export default function () {

    const { login } = useAuth();

    const handleLogin = e => {
        e.preventDefault();
        login();
    }

    return (<>
        <form onSubmit={handleLogin}>

            <div className="form-element">
                <label>Email</label>
                <input type="text" />
            </div>

            <div className="form-element">
                <label>Password</label>
                <input type="password" />
            </div>

            <button>Accedi</button>
        </form>
    </>)
}