
import colors from 'utils/colors';

export default theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '8vh',
        textAlign: 'center',

        '& span': {
            color: colors.pallet.dribbble,
        },

        '& header, & section': {
            zIndex: 1,
        },

        '& section': {
            marginTop: '5vh',
        },

        '& h1': {
            fontFamily: 'HelveticaNeue-UltraLight',
            fontWeight: 'bolder',
            fontSize: 44,
            letterSpacing: 2,
            wordSpacing: 6,
            color: colors.pallet.dribbble,
        },

        '& p': {
            fontSize: 12,
            maxWidth: 300,
            lineHeight: '24px',
            color: colors.pallet.twitter,
            wordSpacing: 2,

            '&$error': {
                color: colors.pallet.grape
            },
        },

        '& input': {
            display: 'block',
            width: 270,
            height: 36,
            marginBottom: 32,
            lineHeight: '36px',
            background: 'none',
            color: '#000',
            fontSize: 14,
            textAlign: 'center',
            border: 0,
            borderBottom: '1px solid #ddd',
            outline: 0,
            transition: '.2s',
        },

        '& input:focus': {
            borderBottomColor: colors.pallet.coral,
        },

        '& button': {
            position: 'relative',
            width: 120,
            height: 40,
            fontSize: 14,
            lineHeight: '40px',
            border: 'none',
            borderRadius: 1,
            backgroundImage: colors.randomGradient(),
            fontFamily: 'Helvetica Neue',
            fontWeight: '300',
            color: '#fff',
            outline: 0,
            overflow: 'hidden',
            cursor: 'pointer',
            letterSpacing: 1,
            transition: '.4s',

            '&:before': {
                position: 'absolute',
                content: '""',
                top: 0,
                left: 0,
                display: 'block',
                height: '100%',
                width: '100%',
                backgroundImage: colors.randomGradient(),
                opacity: 0,
                transition: '.4s',
            },

            '&:hover, &$logining': {
                boxShadow: '0 0 24px 0 rgba(0, 0, 0, .5)',
            },

            '&:hover:before': {
                opacity: 1,
            },

            '& span': {
                position: 'relative',
                zIndex: 1,
                fontWeight: 'bolder',
                color: '#fff',
            }
        },

        '& a': {
            color: '#000',
        },

        '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'block',
            height: '100vh',
            width: '100vw',
            background: 'rgba(255, 255, 255, .7)',
        },
    },

    background: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'block',
        width: '100vw',
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
    },

    back: {
        position: 'fixed',
        top: 16,
        right: 32,
        display: 'inline-block',
        height: 24,
        lineHeight: '24px',
        fontSize: 12,
        zIndex: 9,
        transition: '.2s',

        '& i': {
            display: 'inline-block',
            marginRight: 8,
            fontSize: 20,
            transform: 'translateY(3px)',
        },

        '&:hover': {
            color: colors.pallet.dribbble,
        },
    },

    error: {
        visibility: 'hidden',
        opacity: 0,
        transition: '.2s',
    },

    show: {
        visibility: 'visible',
        opacity: 1,
    },

    logining: {
        opacity: .5,
    },
});
