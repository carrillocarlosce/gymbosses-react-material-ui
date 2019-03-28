package authorization

import (
	"strings"

	"github.com/dgrijalva/jwt-go"
)

func ExtractAccountEmail(authToken string) string {
	splitToken := strings.Split(authToken, "Bearer")
	token := strings.TrimSpace(splitToken[1])

	claims := jwt.MapClaims{}
	jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(""), nil
	})
	return claims["name"].(string)
}
