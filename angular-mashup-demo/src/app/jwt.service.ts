import {Injectable} from '@angular/core';
import { environment } from '../environments/environment';
import * as KJUR from 'jsrsasign';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {
  }

  jwtToken: string = null;

  getJwtToken() {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJhdWQiOiJzYW5kYm94Iiwic3ViIjoicGFzY2FsLndlYmVyQHByb2R5bmEuY29tIiwiand0IjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKU1V6VXhNaUo5LmV5SmhkV1FpT2lKQlZrRk1UMUVpTENKemRXSWlPaUpTVXlJc0ltRjJjVjl5YjJ4bGN5STZXeUp5YjJ4bFgyRjNjMTkxYzJWeUlsMHNJbWx6Y3lJNklrcFhWRkJ5YjNacFpHVnlJaXdpWlhod0lqb3hOVFF4TmpnMU9EWTRMQ0pwWVhRaU9qRTFOREUyTnpFME5qZ3NJbUYyWVd4dmNWOWlkVjlwWkNJNklqa2lMQ0pxZEdraU9pSkVlRGRJYVdwTlprMXlhVXhwV25SYVNXeDNkV04zSWl3aVlYWnhYMkoxSWpvaVFVRkJJbjAuRnpEX215MnJpanVTM19FTEs5NDktRTRONTRCejdkemJGLWlFQ1k1VGtFbHI3RDBzZElreHpVQ09vTno2d1NrVGZ2RnZ0S1hnZ1M2dUdqaDB4ajRKNFhTSzZOY1dwc1NEV3RYdWk4Tms0eTZ2djM0bnNiempvcGVBcWxyR0YwS3loR0NuQmtBYVJkc2RjMDh4XzRqNkNiRUg3WXAzRDZhOXFVdDR5Z2U3N1QxTThVNkZ5TXIxXzY3bUg5VzlTdWRONUJ1djNMc0FsNDljZlZVSFpoNWlTOHBiNVZZZUhQYWUwajV1U3R4Y0tXeUVtUDFHV2EwLVNfc2xRWGdnQjN0YktKRnpPWEFjSkhUSXMtdEZSdkF6c0ZXTTJITEk1WGZ4dWZuX0c5VGJoUjJ0X1F5LU50ZFQ2Q0s4QUpuczFMbkNOblJBNzFMdEdGbTNyNGpIS3g2UURBIiwiaXNzIjoiSldUUHJvdmlkZXIiLCJzYi1pZCI6InhicmpkIiwiZXhwIjoxNTQxNjg1ODY4LCJpYXQiOjE1NDE2NzE0NjgsImp0aSI6IjQza2stdF93QXVzVWotNE0wOGxyaFEifQ.Zbyns7lAUTvVNe6wxWTv9p1NwJ2r1ivG3Uxe1lqg0G5jyutE4i7_R_uuvkoCwR-uoKekxWxANGetlxq2Cz9XE6wXDWW_Gwip05fDhGOuQMnpe886NpBhHxDPyel54N8SvtcaoSZfu7O-ZKzziD0DBbieHKh76cgRjBy0dez0Y7P_cuP3lCprb5n_rpP0hsrknWTIqj86ONWQymGnch838dEuAxGeQ2HmNe-qwVQU3jUN7v_B_ebJUHcpBmiss6i3BP0vBzFwKRZGCW1viXrutUEhsDzBEdDYmElgvvDqmcJSzowYWXCXB2X61PUT5mWCGF58etfZkatAYPB_pHW5lg';
  }

  checkValidSandboxToken(token: string) {
    console.log(environment)
    //if (token == null || environment.environment !== 'sandbox') return false;

    try {
      var parsed = KJUR.jws.JWS.parse(token)
      console.log(parsed);

      // if (parsed.payloadObj.aud != "sandbox") {
      //   console.log("Token has not been created by the sandbox")
      //   return false;
      // }

      //var exp = parsed.payloadObj.exp;
      var now = Math.round((new Date()).getTime() / 1000);
      // if (exp < now + 60) {
      //   console.log("Token is too old.")
      //   return false;
      // }

      // var sbid = parsed.payloadObj["sb-id"];
      // var sandboxUrl : string = environment["sandboxUrl"]
      // if (!sandboxUrl.includes(sbid)) {
      //   console.log("Token has sb-id set to ${sbid} which is incompatible with ${sandboxUrl}")
      //   return false;
      // }

      console.log('hi');
      return true;
    } catch (e) {
      // console.log("Invalid token format")
      return false;
    }
  }

  createJwtToken() {

    var
      header = {
        "alg": "RS512",
        "typ": "JWT"
      };

    var
      payload = {
        "aud": "AVALOQ",
        "sub": "RS",
        "avq_roles": ["role_aws_user"],
        "iss": "MedusaIdP",
        "exp": 0,
        "iat": 0,
        "avaloq_bu_id": 9,
        "avq_bu": "AAA"
      };

    payload
      .
      iat = Math.round((new Date()).getTime() / 1000);
    payload
      .
      exp = payload.iat + (4 * 60 * 60); // 4 hours

    var
      sHeader = JSON.stringify(header);
    var
      sPayload = JSON.stringify(payload);
    var
      keyObj = KJUR.KEYUTIL.getKey(this.privateKey);
    var
      sJWT = KJUR.jws.JWS.sign("RS512", sHeader, sPayload, keyObj);

    return sJWT;
  }

  privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAx9ONsYNL2kAAZZdIstARd3d6nUWX1U6cT4E0yB7Pk2cL4zWZ
y8pZ+oyQBUvW/fXRuQlMNUYpb7wtKDo0KpqkfX6WkgV9+R1U/8wdADigJRYb7ZzM
IfWHT56UDaC5di921H8kco1nriZPnfCPPnJoPn1Q/IoUJbqhQXayWww0i2aumeRU
8GC5OtGZq1zraO8QouiexM50qH3QvP7ZXs1QjsqkA/ZoTuAnGxwrOjR7mlayhC0/
E609lFvFn+h6oQJPcxwX6xhqSIbsOYJ3kdNw5jkaCO63Ob4KefPtZ3TnzKlwBwl4
LHqqK3n1agsOZ2taDrvQDRwDl4eJ6e8UbuLvUwIDAQABAoIBAQCpB+YK64JlatAr
H26Ke4Da6sFYef72m9mTUztfsNhr2rXui2++ODwmuXI2WLHS/3ZZLGk/g0sXzjjw
l1N7WnacBVG+0VB/QnWdL360qjGlTW9wbrsqWrQMAJtCb9uSApJlK+ubzsuOP7AH
bO7upv5RJdY02WQzigxQAOTcKZXk+Abm0Boi1kIPOb7JSXZV3WWNjBefoJyhGrS+
gQaTrN4nI3v20oRU9ZKP6yVB/1PpGiaZLaWQFY2FpfIG2YbkeWOW0pnvO1dt8V1Q
HFqFEfBfwpvPPXgrFQHPT6bUDbFYVXKphlKXuiWAclVoHOzdAEEv5ZE8RUXQyHOM
8eUdLuSBAoGBAOwxxiFMXksXif1nSpj0jI4EA2eB5nUN3cYhWTxeGiVk9+OLA+nE
qDyoQGo0K7NkEk5CCuf3jk/BxdIBO6qcUVzfBJY1xx6JQfyasD5VDkt6BgaHASyU
9RFLkslborwGIVuysDBxHe/MzI4IT/++RIerOcsyBPJ3y49oM2j07ZFBAoGBANiV
F1u5Ut1PeAh+kcRzELnh/8ItTFfe+PRNg45l2Ok/gqeZacSlXzFga7ET1GqBJmZp
0aBA12oCd1PY/crekcuUaNnu4xekgCK/QQDEr2+DTX83Dq1rD6G0JIkShOJ+oezx
pZSZt72Aq46v1xVIeMFsCJizqRegKjIp9/zrz8eTAoGBAJmRx0PRNqHWXTbwmNUY
c+bGfzwmfqPu7xoqhq20dYWIv5Any9SLs+M0diVXZG6QC0Lst9CY6eO7lpZzjMri
NhiPPJk5wAx/q/LE1QDCJrg2T4Kg9sd41lp3a6oWNZnQ1pGbfekRMyi+XOWgS/t5
R296ieouzH6mGylT09FTJr/BAoGBAMEYe9Ddc9G4jm4UWmXpqNnxcpNuy4f0VcWK
bmZAy5l5dEV08+XNAwgEzT79TP7/0nqwkaLs7KGpPTZWWj/LG/WDhc/3uiRUF6Hj
HlNPCJLFYAyxy7Y1o6Qp9gD3r943xKp574SDYFvmIg5/G6XwDSl15lwuoe1ccQJ0
hJLMs11dAoGAWCj9Z/mOWB77FWyrGqer2tvscUv3n8+mlkQhMEA8xr0Y8XCfjpvQ
N8DFb09jFMe0P7ocMQLufEvrESpjvxexZ66I8i0WsPzSzu+00ZFRzcAaUNrBJBUa
swCXqwOArTY6V6YdgNpXZAcGGKu4TCEhlEyk8phLmlyYfjXsbiQkXY8=
-----END RSA PRIVATE KEY-----
`;

}
