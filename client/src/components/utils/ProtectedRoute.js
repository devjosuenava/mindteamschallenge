const ProtectedRoute = ({ auth, protectedComponent, redirect }) => {
    console.log()
    if (auth.role === 'admin' || auth.role === 'superadmin' )
        return protectedComponent
    return redirect
}

export default ProtectedRoute