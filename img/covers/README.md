# 음반 표지 이미지 (앨범 커버)

opera.html의 "명반 컬렉션" 카드는 이 폴더의 이미지를 자동으로 찾아 표시합니다.
이미지가 없으면 색상 슬리브(레이블+연도)로 대체되고, 페이지는 깨지지 않습니다.

## 파일명 규칙
`{작품슬러그 앞부분}-{연도}-{지휘자/대표}.jpg`

현재 opera.html이 참조하는 파일명(라 보엠):

| 파일명 | 녹음 |
|---|---|
| `laboheme-1972-karajan.jpg` | 카라얀 / 파바로티·프레니 (Decca, 1972) |
| `laboheme-1959-serafin.jpg` | 세라핀 / 테발디·베르곤지 (Decca, 1959) |
| `laboheme-1956-callas.jpg`  | 보토 / 칼라스·디 스테파노 (EMI, 1956) |
| `laboheme-1998-chailly.jpg` | 샤이 / 알라냐·게오르규 (Decca, 1998) |
| `laboheme-1956-beecham.jpg` | 비첨 / 데 로스 앙헬레스·비욜링 (EMI, 1956) |

opera.html이 참조하는 나머지 14개 작품의 파일명:

| 작품 | 파일명 |
|---|---|
| 투란도트 | `turandot-1972-mehta.jpg`, `turandot-1959-leinsdorf.jpg`, `turandot-1981-karajan.jpg` |
| 나비부인 | `butterfly-1974-karajan.jpg`, `butterfly-1955-callas.jpg`, `butterfly-1966-barbirolli.jpg` |
| 라 트라비아타 | `traviata-1977-kleiber.jpg`, `traviata-1955-giulini-callas.jpg`, `traviata-1962-pritchard.jpg` |
| 리골레토 | `rigoletto-1971-bonynge.jpg`, `rigoletto-1955-serafin.jpg`, `rigoletto-1979-giulini.jpg` |
| 아이다 | `aida-1961-solti.jpg`, `aida-1959-karajan.jpg`, `aida-1974-muti.jpg` |
| 카르멘 | `carmen-1959-beecham.jpg`, `carmen-1963-karajan.jpg`, `carmen-1983-karajan.jpg` |
| 피가로의 결혼 | `figaro-1955-kleiber.jpg`, `figaro-1959-giulini.jpg`, `figaro-1968-bohm.jpg` |
| 마술피리 | `zauberflote-1964-bohm.jpg`, `zauberflote-1964-klemperer.jpg`, `zauberflote-1969-solti.jpg` |
| 세비야의 이발사 | `barbiere-1957-galliera.jpg`, `barbiere-1971-abbado.jpg`, `barbiere-1983-marriner.jpg` |
| 니벨룽의 반지 | `ring-1958-solti.jpg`, `ring-1966-karajan.jpg`, `ring-1953-furtwangler.jpg` |
| 백조의 호수 | `swanlake-1966-fonteyn-nureyev.jpg`, `swanlake-1976-plisetskaya.jpg`, `swanlake-1976-previn.jpg` |
| 호두까기인형 | `nutcracker-1993-martins.jpg`, `nutcracker-1972-previn.jpg`, `nutcracker-mariinsky-gergiev.jpg` |
| 잠자는 숲속의 미녀 | `sleepingbeauty-1974-previn.jpg`, `sleepingbeauty-1999-vikharev.jpg` |
| 봄의 제전 | `riteofspring-1961-stravinsky.jpg`, `riteofspring-1969-boulez.jpg`, `riteofspring-1987-joffrey.jpg` |

## 주의 (저작권)
음반 표지 아트워크는 대부분 저작권이 있는 상업 이미지입니다. 개인 학습·감상용 썸네일로만
사용하고, 공개 배포(GitHub Pages 등) 시에는 자유 라이선스(예: Wikimedia Commons) 이미지이거나
직접 촬영/보유한 이미지인지 확인하세요. 확실하지 않으면 색상 슬리브 기본값을 그대로 두는 편이 안전합니다.

권장 크기: 정사각형(예: 500×500px) JPG. `object-fit: cover`로 잘려 표시됩니다.
