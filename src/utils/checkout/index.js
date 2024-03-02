import { isEmpty } from 'lodash';
import { createTheOrder, getCreateOrderData } from './order';
import axios from 'axios';
import { WOOCOMMERCE_STATES_ENDPOINT } from "@/config-global";

/**
 * Handle Other Payment Method checkout.
 *
 * @param input
 * @param products
 * @param setRequestError
 * @param setCart
 * @param setIsOrderProcessing
 * @param setCreatedOrderData
 * @return {Promise<{orderId: null, error: string}|null>}
 */
export const handleOtherPaymentMethodCheckout = async ( input, products, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData ) => {
	setIsOrderProcessing( true );
	const orderData = getCreateOrderData( input, products);
	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );
	// const cartCleared = await clearCart( setCart, () => {
	// } );
	setIsOrderProcessing( false );
	
	if ( isEmpty( customerOrderData?.orderId ) ) {
		setRequestError( 'Clear cart failed' );
		return null;
	}
	
	setCreatedOrderData( customerOrderData );
	
	return customerOrderData;
};

/**
 * Handle Billing Different Than Shipping.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleBillingDifferentThanShipping = ( input, setInput, target ) => {
	const newState = { ...input, [ target.name ]: ! input.billingDifferentThanShipping };
	setInput( newState );
};

/**
 * Handle Create Account.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleCreateAccount = ( input, setInput, target ) => {
	const newState = { ...input, [ target.name ]: ! input.createAccount };
	setInput( newState );
};

/**
 * Set states for the country.
 *
 * @param {Object} target Target.
 * @param {Function} setTheStates React useState function to set the value of the states basis country selection.
 * @param {Function} setIsFetchingStates React useState function, to manage loading state when request is in process.
 *
 * @return {Promise<void>}
 */
export const setStatesForCountry = async ( target, setTheStates, setIsFetchingStates ) => {
	if ( 'country' === target.name ) {
		setIsFetchingStates( true );
		const countryCode = target[ target.selectedIndex ].getAttribute( 'data-countrycode' );
		const states = await getStates( countryCode );
		setTheStates( states || [] );
		setIsFetchingStates( false );
	}
};

/**
 * Get states
 *
 * @param {String} countryCode Country code
 *
 * @returns {Promise<*[]>}
 */
export const getStates = async ( countryCode = '' ) => {
	
	if ( ! countryCode ) {
		return [];
	}
	
	const { data } = await axios.get( WOOCOMMERCE_STATES_ENDPOINT, { params: { countryCode } } );
	
	return data?.states ?? [];
};

