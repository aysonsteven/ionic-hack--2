import { Component } from '@angular/core';
import { AppRoute } from '../../../../app/app.route';
import { formProcess } from '../../../../etc/share';
import { Member, MEMBER_LOGIN_DATA } from '../../../../api/philgo-api/v2/member';
import { FirebaseAuth } from '../../../../api/firebase-api/firebase-auth';
import { LanguagePipe } from '../../../../pipes/language/language.pipe';
@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})
export class LoginPage {
    title: string = "Login";
    form = < MEMBER_LOGIN_DATA > {};
    process = formProcess.reset();
    constructor(
        private member: Member,
        private auth: FirebaseAuth,
        private ln: LanguagePipe,
        private route: AppRoute
    ) {

        this.form.id = 'thruthesky';
        this.form.password = '1111';
        //this.onClickLogin();

//        this.login();


    }
    onClickLogin() {
        console.log("LoginPage::onClickLogin()");
        this.login();
    }


    login() {

        //this.process.loader = true;
        //this.process.error = '';
        this.process.startLoader();
        this.member.login( this.form,
            login => {
                console.log('philgo login success: ', login);
                this.loginFirebase( login );
            },
            er => {
                // alert("login error:" + er);
                console.log("philgo member.login error: ", er );
                setTimeout(()=>this.process.setError( er ),345);
            },
            () => {
                console.log('philgo login complete!');
            }
        );

    }
    loginFirebase( login ) {
        let email = this.member.getApiEmail(login);
        let password = this.member.getApiPassword(login);
        this.auth.register( email, password, firebaseUser => { // register
            console.log("firebase register success.");
            // every thing is good. go home.
            this.route.go('/');
        }, (code, message ) => {
            if ( code == 'auth/email-already-in-use' ) { // if already registred, login
                console.log('firebase: already registered. try to login');
                this.auth.login( email, password, firebaseUser => {
                    console.log('firebase: login success');
                    this.process.loader = false;
                    // every thing is good. go home.
                    this.route.go('/');
                }, (code, message) => {
                    message = 'Warning! Login Error. Error Code: ' + code + ' : ' + message + ' Please report this error message to admin.';
                    // this.process.error = message;
                    this.process.setError( message );
                } );
            }
            else { // if firebase register or login error.
                message = 'Warning! Login Error. Error Code: ' + code + ' : ' + message + ' Please report this error message to admin.';
                // this.process.error = message;
                // this.process.loader = false;
                this.process.setError( message );
            }

        });
    }
}