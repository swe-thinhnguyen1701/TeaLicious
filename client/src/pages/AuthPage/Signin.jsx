function Signin () {
    return(
        <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Sign In</button>
        </form>
      </div>
    )
}

export default Signin;